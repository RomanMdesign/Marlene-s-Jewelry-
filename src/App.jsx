import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

import {
  onValue,
  push,
  ref,
  remove,
  set,
  update,
} from "firebase/database";

import { auth, db } from "../firebase.js";

const money = (n) =>
  `₱${Number(n || 0).toLocaleString("en-PH", {
    minimumFractionDigits: 2,
  })}`;

const now = () => Date.now();

function useAuthUser() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    return onAuthStateChanged(auth, setUser);
  }, []);

  return user;
}

function useRTDB(path, fallback = {}) {
  const [data, setData] = useState(fallback);

  useEffect(() => {
    const databaseRef = ref(db, path);

    return onValue(databaseRef, (snapshot) => {
      setData(snapshot.exists() ? snapshot.val() : fallback);
    });
  }, [path]);

  return data;
}

async function dbSet(path, value) {
  await set(ref(db, path), value);
}

async function dbUpdate(path, value) {
  await update(ref(db, path), value);
}

async function dbRemove(path) {
  await remove(ref(db, path));
}

/* =========================================================
   AUTHENTICATION
========================================================= */

function AuthPage({ mode = "login" }) {
  const isLogin = mode === "login";
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event) {
    event.preventDefault();

    setError("");
    setBusy(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(
          auth,
          email.trim(),
          password
        );
      } else {
        const credential =
          await createUserWithEmailAndPassword(
            auth,
            email.trim(),
            password
          );

        if (name.trim()) {
          await updateProfile(credential.user, {
            displayName: name.trim(),
          });
        }

        await dbSet(`users/${credential.user.uid}`, {
          role: "customer",
          name: name.trim(),
          email: email.trim(),
          createdAt: now(),
        });
      }

      navigate("/portal");
    } catch (error) {
      setError(
        error?.message?.replace("Firebase: ", "") ||
          "Authentication failed."
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <Link to="/" className="brand">
          Marlene’s Jewelry
        </Link>

        <h1>
          {isLogin
            ? "Welcome back"
            : "Create your account"}
        </h1>

        <p className="muted">
          {isLogin
            ? "Sign in to continue to your portal."
            : "Your account is stored in Firebase Authentication."}
        </p>

        <form onSubmit={submit} className="form">
          {!isLogin && (
            <label>
              Name
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
          )}

          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              minLength={6}
              required
            />
          </label>

          {error && <div className="error">{error}</div>}

          <button
            className="btn primary"
            disabled={busy}
          >
            {busy
              ? "Please wait…"
              : isLogin
              ? "Log in"
              : "Create account"}
          </button>
        </form>

        <p className="switch">
          {isLogin
            ? "No account?"
            : "Already registered?"}{" "}
          <Link
            to={isLogin ? "/register" : "/login"}
          >
            {isLogin ? "Create one" : "Log in"}
          </Link>
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   PUBLIC WEBSITE
========================================================= */

function PublicLayout() {
  const navigation = useRTDB("navigation", {});
  const settings = useRTDB("settings", {});

  const dynamicLinks = Object.values(
    navigation || {}
  )
    .filter((item) => item?.active !== false)
    .sort(
      (a, b) => (a.order || 0) - (b.order || 0)
    );

  const fallbackLinks = [
    {
      label: "Home",
      path: "/",
      order: 1,
    },
    {
      label: "Shopping Center",
      path: "/shop",
      order: 2,
    },
    {
      label: "Services",
      path: "/services",
      order: 3,
    },
    {
      label: "Customer Service",
      path: "/customer-service",
      order: 4,
    },
    {
      label: "Inquiries",
      path: "/inquiries",
      order: 5,
    },
  ];

  const links =
    dynamicLinks.length > 0
      ? dynamicLinks
      : fallbackLinks;

  return (
    <div className="site">
      <header className="topbar">
        <Link to="/" className="brand">
          {settings.storeName ||
            "Marlene’s Jewelry"}
        </Link>

        <nav>
          {links.map((item, index) => (
            <NavLink
              key={`${item.path}-${index}`}
              to={item.path}
              className={({ isActive }) =>
                isActive ? "active" : ""
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="actions">
          <Link
            className="btn small"
            to="/login"
          >
            Log in
          </Link>

          <Link
            className="btn primary small"
            to="/register"
          >
            Create Account
          </Link>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <strong>
          {settings.storeName ||
            "Marlene’s Jewelry"}
        </strong>

        <span>{settings.email || ""}</span>
        <span>{settings.phone || ""}</span>
      </footer>
    </div>
  );
}

function Home() {
  const homepage = useRTDB("homepage", {});
  const announcements = useRTDB(
    "announcements",
    {}
  );
  const products = useRTDB("products", {});

  const featured = Object.entries(products || {})
    .filter(
      ([, product]) =>
        product?.status !== "inactive"
    )
    .slice(0, 4);

  return (
    <div>
      <section className="hero">
        <div>
          <p className="eyebrow">
            MARLENE’S JEWELRY
          </p>

          <h1>
            {homepage.title ||
              "Jewelry made to be remembered."}
          </h1>

          <p>
            {homepage.subtitle ||
              "Shop jewelry, request services, and connect with our team."}
          </p>

          <Link
            className="btn primary"
            to={homepage.buttonPath || "/shop"}
          >
            {homepage.buttonText || "Shop now"}
          </Link>
        </div>
      </section>

      {Object.entries(announcements || {})
        .filter(([, item]) => item?.active)
        .map(([id, item]) => (
          <div className="notice" key={id}>
            <b>{item.title}</b>
            <span>{item.message}</span>
          </div>
        ))}

      <section className="section">
        <div className="section-head">
          <h2>Featured jewelry</h2>
          <Link to="/shop">View all</Link>
        </div>

        <div className="grid">
          {featured.length ? (
            featured.map(([id, product]) => (
              <ProductCard
                key={id}
                id={id}
                product={product}
              />
            ))
          ) : (
            <Empty text="No products published yet." />
          )}
        </div>
      </section>
    </div>
  );
}

function ProductCard({ id, product }) {
  return (
    <article className="card product">
      {product.imageUrl ? (
        <img
          src={product.imageUrl}
          alt={product.name}
        />
      ) : (
        <div className="image-placeholder">
          Jewelry
        </div>
      )}

      <div className="pad">
        <small>
          {product.categoryName || "Jewelry"}
        </small>

        <h3>{product.name}</h3>

        <p>{money(product.price)}</p>

        <Link
          className="btn small"
          to={`/shop/${id}`}
        >
          View
        </Link>
      </div>
    </article>
  );
}

function Shop() {
  const products = useRTDB("products", {});

  const list = Object.entries(products || {})
    .filter(
      ([, product]) =>
        product?.status !== "inactive"
    );

  return (
    <section className="section">
      <h1>Shopping Center</h1>

      <div className="grid">
        {list.length ? (
          list.map(([id, product]) => (
            <ProductCard
              key={id}
              id={id}
              product={product}
            />
          ))
        ) : (
          <Empty text="No products published yet." />
        )}
      </div>
    </section>
  );
}

function ProductDetail({ id }) {
  const products = useRTDB("products", {});
  const product = products?.[id];
  const user = useAuthUser();
  const navigate = useNavigate();

  if (!product) {
    return (
      <section className="section">
        <Empty text="Product not found." />
      </section>
    );
  }

  async function addToCart() {
    if (!user) {
      navigate("/login");
      return;
    }

    await dbSet(
      `carts/${user.uid}/${id}`,
      {
        productId: id,
        name: product.name,
        price: Number(product.price || 0),
        quantity: 1,
        imageUrl: product.imageUrl || "",
        updatedAt: now(),
      }
    );

    alert("Added to cart.");
  }

  return (
    <section className="section detail">
      <div>
        {product.imageUrl ? (
          <img
            className="detail-img"
            src={product.imageUrl}
            alt={product.name}
          />
        ) : (
          <div className="detail-img image-placeholder">
            Jewelry
          </div>
        )}
      </div>

      <div>
        <small>
          {product.categoryName || "Jewelry"}
        </small>

        <h1>{product.name}</h1>

        <h2>{money(product.price)}</h2>

        <p>{product.description}</p>

        <p>
          Stock: {product.stock ?? "Available"}
        </p>

        <button
          className="btn primary"
          onClick={addToCart}
        >
          Add to cart
        </button>
      </div>
    </section>
  );
}

function Services() {
  const services = useRTDB("services", {});

  return (
    <section className="section">
      <h1>Services</h1>

      <div className="grid">
        {Object.entries(services || {})
          .filter(
            ([, service]) =>
              service?.status !== "inactive"
          )
          .map(([id, service]) => (
            <article
              className="card pad"
              key={id}
            >
              <h3>{service.name}</h3>

              <p>{service.description}</p>

              <b>
                {service.price
                  ? money(service.price)
                  : "Contact us"}
              </b>

              {service.duration && (
                <small>
                  {service.duration}
                </small>
              )}
            </article>
          ))}
      </div>
    </section>
  );
}

function InquiryForm() {
  const user = useAuthUser();

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [sent, setSent] = useState(false);

  async function submit(event) {
    event.preventDefault();

    const inquiryId = push(
      ref(db, "inquiries")
    ).key;

    const inquiry = {
      ...form,
      customerId: user?.uid || null,
      status: "new",
      reply: "",
      createdAt: now(),
      updatedAt: now(),
    };

    await dbSet(
      `inquiries/${inquiryId}`,
      inquiry
    );

    if (user) {
      await dbSet(
        `userInquiries/${user.uid}/${inquiryId}`,
        inquiry
      );
    }

    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

    setSent(true);
  }

  return (
    <section className="section narrow">
      <h1>Inquiries</h1>

      <p>
        Send us a message and our team will respond.
      </p>

      {sent && (
        <div className="success">
          Inquiry sent successfully.
        </div>
      )}

      <form
        className="form"
        onSubmit={submit}
      >
        <label>
          Name
          <input
            required
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />
        </label>

        <label>
          Email
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
          />
        </label>

        <label>
          Subject
          <input
            required
            value={form.subject}
            onChange={(e) =>
              setForm({
                ...form,
                subject: e.target.value,
              })
            }
          />
        </label>

        <label>
          Message
          <textarea
            required
            rows="6"
            value={form.message}
            onChange={(e) =>
              setForm({
                ...form,
                message: e.target.value,
              })
            }
          />
        </label>

        <button className="btn primary">
          Send inquiry
        </button>
      </form>
    </section>
  );
}

/* =========================================================
   CUSTOMER PORTAL
========================================================= */

function CustomerGuard({ children }) {
  const user = useAuthUser();

  if (user === undefined) {
    return <Loading />;
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return children;
}

function EditorGuard({ children }) {
  const user = useAuthUser();

  const profile = useRTDB(
    user
      ? `users/${user.uid}`
      : "__no_user__",
    null
  );

  if (user === undefined) {
    return <Loading />;
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  if (
    !profile ||
    profile.role !== "editor"
  ) {
    return (
      <Navigate
        to="/portal"
        replace
      />
    );
  }

  return children;
}

function CustomerLayout() {
  const user = useAuthUser();

  const links = [
    ["/portal", "Dashboard"],
    ["/portal/account", "Account"],
    ["/portal/cart", "Cart"],
    ["/portal/orders", "Orders"],
    ["/portal/messages", "Messages"],
    ["/portal/inquiries", "Inquiries"],
  ];

  return (
    <div className="app-shell">
      <aside>
        <Link
          className="brand"
          to="/"
        >
          {user?.displayName || "Customer"}
        </Link>

        {links.map(([path, label]) => (
          <NavLink
            key={path}
            to={path}
          >
            {label}
          </NavLink>
        ))}

        <button
          className="logout"
          onClick={() => signOut(auth)}
        >
          Log out
        </button>
      </aside>

      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

function CustomerDashboard() {
  return (
    <section className="section">
      <h1>Customer Portal</h1>

      <p>
        Manage your account, cart, orders,
        messages and inquiries.
      </p>

      <div className="portal-cards">
        <Link to="/portal/cart">
          Cart
        </Link>

        <Link to="/portal/orders">
          Orders
        </Link>

        <Link to="/portal/inquiries">
          Inquiries
        </Link>
      </div>
    </section>
  );
}

function Account() {
  const user = useAuthUser();

  const [name, setName] = useState("");

  useEffect(() => {
    setName(user?.displayName || "");
  }, [user]);

  async function save() {
    await updateProfile(user, {
      displayName: name,
    });

    await dbUpdate(
      `users/${user.uid}`,
      {
        name,
        updatedAt: now(),
      }
    );

    alert("Account updated.");
  }

  return (
    <section className="section narrow">
      <h1>Account</h1>

      <p>{user?.email}</p>

      <label>
        Name
        <input
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />
      </label>

      <button
        className="btn primary"
        onClick={save}
      >
        Save
      </button>
    </section>
  );
}

function Cart() {
  const user = useAuthUser();

  const cart = useRTDB(
    user
      ? `carts/${user.uid}`
      : "__none__",
    {}
  );

  const items = Object.values(cart || {});

  const total = items.reduce(
    (sum, item) =>
      sum +
      Number(item.price || 0) *
        Number(item.quantity || 1),
    0
  );

  const navigate = useNavigate();

  async function checkout() {
    if (!items.length) {
      return;
    }

    const orderId = push(
      ref(db, `orders/${user.uid}`)
    ).key;

    await dbSet(
      `orders/${user.uid}/${orderId}`,
      {
        customerId: user.uid,
        customerName:
          user.displayName || "",
        customerEmail:
          user.email || "",
        items,
        subtotal: total,
        total,
        status: "pending",
        createdAt: now(),
        updatedAt: now(),
      }
    );

    await dbRemove(
      `carts/${user.uid}`
    );

    alert("Order placed.");

    navigate("/portal/orders");
  }

  return (
    <section className="section">
      <h1>Cart</h1>

      {items.map((item, index) => (
        <div
          className="list-row"
          key={index}
        >
          <span>{item.name}</span>

          <span>
            {money(item.price)} ×{" "}
            {item.quantity || 1}
          </span>
        </div>
      ))}

      {!items.length && (
        <Empty text="Your cart is empty." />
      )}

      <h2>
        Total: {money(total)}
      </h2>

      <button
        className="btn primary"
        disabled={!items.length}
        onClick={checkout}
      >
        Place order
      </button>
    </section>
  );
}

function Orders() {
  const user = useAuthUser();

  const orders = useRTDB(
    user
      ? `orders/${user.uid}`
      : "__none__",
    {}
  );

  return (
    <section className="section">
      <h1>Orders</h1>

      {Object.entries(orders || {}).map(
        ([id, order]) => (
          <div
            className="card pad"
            key={id}
          >
            <b>
              Order #{id.slice(-6)}
            </b>

            <span className="badge">
              {order.status}
            </span>

            <p>
              {money(order.total)}
            </p>
          </div>
        )
      )}

      {!Object.keys(orders || {}).length && (
        <Empty text="No orders yet." />
      )}
    </section>
  );
}

function Messages() {
  const user = useAuthUser();

  const messages = useRTDB(
    user
      ? `messages/${user.uid}`
      : "__none__",
    {}
  );

  return (
    <section className="section">
      <h1>Messages</h1>

      {Object.values(messages || {}).map(
        (message, index) => (
          <div
            className="card pad"
            key={index}
          >
            <b>
              {message.subject ||
                "Message"}
            </b>

            <p>{message.message}</p>
          </div>
        )
      )}

      {!Object.keys(messages || {}).length && (
        <Empty text="No messages yet." />
      )}
    </section>
  );
}

function MyInquiries() {
  const user = useAuthUser();

  const inquiries = useRTDB(
    user
      ? `userInquiries/${user.uid}`
      : "__none__",
    {}
  );

  return (
    <section className="section">
      <h1>My Inquiries</h1>

      {Object.entries(inquiries || {}).map(
        ([id, inquiry]) => (
          <div
            className="card pad"
            key={id}
          >
            <b>{inquiry.subject}</b>

            <span className="badge">
              {inquiry.status}
            </span>

            <p>{inquiry.message}</p>

            {inquiry.reply && (
              <div className="reply">
                <b>Reply:</b>{" "}
                {inquiry.reply}
              </div>
            )}
          </div>
        )
      )}

      {!Object.keys(inquiries || {}).length && (
        <Empty text="No inquiries yet." />
      )}
    </section>
  );
}

/* =========================================================
   EDITOR PORTAL
========================================================= */

function EditorLayout() {
  const links = [
    ["/editor", "Dashboard"],
    ["/editor/website", "Website Editor"],
    ["/editor/products", "Products"],
    ["/editor/categories", "Categories"],
    ["/editor/services", "Services"],
    ["/editor/home", "Home Page"],
    ["/editor/messages", "Messages"],
    ["/editor/inquiries", "Inquiries"],
    ["/editor/orders", "Orders"],
    ["/editor/customers", "Customers"],
    ["/editor/media", "Media"],
    ["/editor/navigation", "Navigation"],
    ["/editor/announcements", "Announcements"],
    ["/editor/settings", "Website Settings"],
    ["/editor/activity", "Activity Log"],
  ];

  return (
    <div className="app-shell editor">
      <aside>
        <Link
          className="brand"
          to="/editor"
        >
          Editor Portal
        </Link>

        {links.map(([path, label]) => (
          <NavLink
            key={path}
            to={path}
          >
            {label}
          </NavLink>
        ))}

        <button
          className="logout"
          onClick={() => signOut(auth)}
        >
          Log out
        </button>
      </aside>

      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <section className="section">
      <h1>Editor Dashboard</h1>

      <p>
        All website content below is stored
        in Firebase Realtime Database.
      </p>

      <div className="portal-cards">
        <Link to="/editor/products">
          Products
        </Link>

        <Link to="/editor/orders">
          Orders
        </Link>

        <Link to="/editor/inquiries">
          Inquiries
        </Link>

        <Link to="/editor/customers">
          Customers
        </Link>
      </div>
    </section>
  );
}

/* =========================================================
   GENERIC CRUD
========================================================= */

const fields = {
  products: [
    ["name", "Name"],
    ["description", "Description", "textarea"],
    ["price", "Price"],
    ["categoryName", "Category"],
    ["imageUrl", "Image URL"],
    ["stock", "Stock"],
    ["status", "Status"],
  ],

  categories: [
    ["name", "Name"],
    ["description", "Description", "textarea"],
    ["imageUrl", "Image URL"],
    ["status", "Status"],
  ],

  services: [
    ["name", "Name"],
    ["description", "Description", "textarea"],
    ["price", "Price"],
    ["duration", "Duration"],
    ["imageUrl", "Image URL"],
    ["status", "Status"],
  ],

  announcements: [
    ["title", "Title"],
    ["message", "Message", "textarea"],
    ["active", "Active", "checkbox"],
  ],

  navigation: [
    ["label", "Label"],
    ["path", "Path"],
    ["order", "Order"],
    ["active", "Active", "checkbox"],
  ],
};

function Crud({ type, title }) {
  const data = useRTDB(type, {});

  const empty = Object.fromEntries(
    fields[type].map(
      ([key, , kind]) => [
        key,
        kind === "checkbox"
          ? true
          : "",
      ]
    )
  );

  const [form, setForm] =
    useState(empty);

  const [editing, setEditing] =
    useState(null);

  function startEditing(id, item) {
    setEditing(id);

    setForm({
      ...empty,
      ...item,
    });
  }

  async function save(event) {
    event.preventDefault();

    const id =
      editing ||
      push(ref(db, type)).key;

    const clean = {
      ...form,
      createdAt:
        form.createdAt || now(),
      updatedAt: now(),
    };

    for (const key of [
      "price",
      "stock",
      "order",
    ]) {
      if (
        clean[key] !== "" &&
        clean[key] !== null &&
        clean[key] !== undefined
      ) {
        clean[key] = Number(
          clean[key]
        );
      }
    }

    await dbSet(
      `${type}/${id}`,
      clean
    );

    setEditing(null);
    setForm(empty);
  }

  async function deleteItem(id) {
    if (
      window.confirm(
        "Delete this item?"
      )
    ) {
      await dbRemove(
        `${type}/${id}`
      );
    }
  }

  return (
    <section className="section">
      <div className="section-head">
        <h1>{title}</h1>
      </div>

      <form
        className="editor-form"
        onSubmit={save}
      >
        {fields[type].map(
          ([key, label, kind]) => (
            <label key={key}>
              {label}

              {kind === "textarea" ? (
                <textarea
                  value={
                    form[key] ?? ""
                  }
                  onChange={(e) =>
                    setForm({
                      ...form,
                      [key]:
                        e.target.value,
                    })
                  }
                />
              ) : kind ===
                "checkbox" ? (
                <input
                  type="checkbox"
                  checked={!!form[key]}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      [key]:
                        e.target.checked,
                    })
                  }
                />
              ) : (
                <input
                  value={
                    form[key] ?? ""
                  }
                  onChange={(e) =>
                    setForm({
                      ...form,
                      [key]:
                        e.target.value,
                    })
                  }
                />
              )}
            </label>
          )
        )}

        <div>
          <button className="btn primary">
            {editing
              ? "Update"
              : "Add"}
          </button>

          {editing && (
            <button
              type="button"
              className="btn"
              onClick={() => {
                setEditing(null);
                setForm(empty);
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="admin-list">
        {Object.entries(data || {}).map(
          ([id, item]) => (
            <div
              className="list-row"
              key={id}
            >
              <div>
                <b>
                  {item.name ||
                    item.title ||
                    item.label}
                </b>

                <small>
                  {item.description ||
                    item.message ||
                    item.path ||
                    ""}
                </small>
              </div>

              <div>
                <button
                  className="btn small"
                  onClick={() =>
                    startEditing(
                      id,
                      item
                    )
                  }
                >
                  Edit
                </button>

                <button
                  className="btn small danger"
                  onClick={() =>
                    deleteItem(id)
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
}

/* =========================================================
   HOME EDITOR
========================================================= */

function HomeEditor() {
  const current = useRTDB(
    "homepage",
    {}
  );

  const [form, setForm] =
    useState({
      title: "",
      subtitle: "",
      buttonText: "",
      buttonPath: "/shop",
    });

  useEffect(() => {
    setForm((old) => ({
      ...old,
      ...current,
    }));
  }, [
    current.title,
    current.subtitle,
    current.buttonText,
    current.buttonPath,
  ]);

  async function save() {
    await dbSet("homepage", {
      ...form,
      updatedAt: now(),
    });

    alert("Home page saved.");
  }

  return (
    <section className="section narrow">
      <h1>Home Page</h1>

      <label>
        Title
        <input
          value={form.title}
          onChange={(e) =>
            setForm({
              ...form,
              title: e.target.value,
            })
          }
        />
      </label>

      <label>
        Subtitle
        <textarea
          value={form.subtitle}
          onChange={(e) =>
            setForm({
              ...form,
              subtitle:
                e.target.value,
            })
          }
        />
      </label>

      <label>
        Button text
        <input
          value={form.buttonText}
          onChange={(e) =>
            setForm({
              ...form,
              buttonText:
                e.target.value,
            })
          }
        />
      </label>

      <label>
        Button path
        <input
          value={form.buttonPath}
          onChange={(e) =>
            setForm({
              ...form,
              buttonPath:
                e.target.value,
            })
          }
        />
      </label>

      <button
        className="btn primary"
        onClick={save}
      >
        Save Home Page
      </button>
    </section>
  );
}

/* =========================================================
   SETTINGS
========================================================= */

function Settings() {
  const data = useRTDB(
    "settings",
    {}
  );

  const [form, setForm] =
    useState({
      storeName: "",
      email: "",
      phone: "",
    });

  useEffect(() => {
    setForm({
      storeName:
        data.storeName || "",
      email: data.email || "",
      phone: data.phone || "",
    });
  }, [
    data.storeName,
    data.email,
    data.phone,
  ]);

  async function save() {
    await dbUpdate(
      "settings",
      form
    );

    alert("Settings saved.");
  }

  return (
    <section className="section narrow">
      <h1>Website Settings</h1>

      {Object.keys(form).map(
        (key) => (
          <label key={key}>
            {key}

            <input
              value={form[key]}
              onChange={(e) =>
                setForm({
                  ...form,
                  [key]:
                    e.target.value,
                })
              }
            />
          </label>
        )
      )}

      <button
        className="btn primary"
        onClick={save}
      >
        Save Settings
      </button>
    </section>
  );
}

/* =========================================================
   EDITOR INQUIRIES
========================================================= */

function EditorInquiries() {
  const inquiries = useRTDB(
    "inquiries",
    {}
  );

  const [replies, setReplies] =
    useState({});

  async function saveReply(
    id
  ) {
    const reply =
      replies[id] || "";

    await dbUpdate(
      `inquiries/${id}`,
      {
        reply,
        status: "replied",
        updatedAt: now(),
      }
    );

    const inquiry =
      inquiries[id];

    if (inquiry?.customerId) {
      await dbSet(
        `messages/${inquiry.customerId}/${id}`,
        {
          subject:
            `Reply: ${inquiry.subject}`,
          message: reply,
          senderId:
            auth.currentUser.uid,
          senderRole: "editor",
          createdAt: now(),
        }
      );

      await dbUpdate(
        `userInquiries/${inquiry.customerId}/${id}`,
        {
          reply,
          status: "replied",
          updatedAt: now(),
        }
      );
    }
  }

  return (
    <section className="section">
      <h1>Inquiries</h1>

      {Object.entries(
        inquiries || {}
      ).map(([id, inquiry]) => (
        <div
          className="card pad"
          key={id}
        >
          <b>{inquiry.subject}</b>

          <p>{inquiry.message}</p>

          <small>
            {inquiry.email}
          </small>

          <textarea
            placeholder="Reply"
            value={
              replies[id] ??
              inquiry.reply ??
              ""
            }
            onChange={(e) =>
              setReplies({
                ...replies,
                [id]:
                  e.target.value,
              })
            }
          />

          <button
            className="btn primary small"
            onClick={() =>
              saveReply(id)
            }
          >
            Save reply
          </button>
        </div>
      ))}
    </section>
  );
}

/* =========================================================
   EDITOR ORDERS
========================================================= */

function EditorOrders() {
  const orders = useRTDB(
    "orders",
    {}
  );

  const rows = Object.entries(
    orders || {}
  ).flatMap(
    ([uid, customerOrders]) =>
      Object.entries(
        customerOrders || {}
      ).map(([id, order]) => ({
        uid,
        id,
        ...order,
      }))
  );

  async function changeStatus(
    uid,
    id,
    status
  ) {
    await dbUpdate(
      `orders/${uid}/${id}`,
      {
        status,
        updatedAt: now(),
      }
    );
  }

  return (
    <section className="section">
      <h1>Orders</h1>

      {rows.map((order) => (
        <div
          className="card pad"
          key={order.id}
        >
          <b>
            #{order.id.slice(-6)}
          </b>

          <p>
            {order.customerEmail} —{" "}
            {money(order.total)}
          </p>

          <span className="badge">
            {order.status}
          </span>

          <div className="button-row">
            {[
              "pending",
              "processing",
              "shipped",
              "completed",
              "cancelled",
            ].map((status) => (
              <button
                className="btn small"
                key={status}
                onClick={() =>
                  changeStatus(
                    order.uid,
                    order.id,
                    status
                  )
                }
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

/* =========================================================
   CUSTOMERS
========================================================= */

function Customers() {
  const users = useRTDB(
    "users",
    {}
  );

  return (
    <section className="section">
      <h1>Customers</h1>

      {Object.entries(
        users || {}
      ).map(([id, user]) => (
        <div
          className="list-row"
          key={id}
        >
          <div>
            <b>
              {user.name ||
                "Unnamed"}
            </b>

            <small>
              {user.email}
            </small>
          </div>

          <span className="badge">
            {user.role ||
              "customer"}
          </span>
        </div>
      ))}
    </section>
  );
}

/* =========================================================
   ADMIN MESSAGES
========================================================= */

function MessagesAdmin() {
  const messages = useRTDB(
    "messages",
    {}
  );

  const rows =
    Object.entries(messages || {})
      .flatMap(
        ([uid, customerMessages]) =>
          Object.entries(
            customerMessages || {}
          ).map(([id, message]) => ({
            uid,
            id,
            ...message,
          }))
      );

  return (
    <section className="section">
      <h1>Messages</h1>

      {rows.map((message) => (
        <div
          className="card pad"
          key={`${message.uid}-${message.id}`}
        >
          <b>
            {message.subject}
          </b>

          <p>
            {message.message}
          </p>

          <small>
            Customer UID:{" "}
            {message.uid}
          </small>
        </div>
      ))}
    </section>
  );
}

/* =========================================================
   MEDIA
========================================================= */

function Media() {
  const media = useRTDB(
    "media",
    {}
  );

  const [name, setName] =
    useState("");

  const [url, setUrl] =
    useState("");

  async function save(event) {
    event.preventDefault();

    const id = push(
      ref(db, "media")
    ).key;

    await dbSet(
      `media/${id}`,
      {
        name,
        url,
        createdAt: now(),
      }
    );

    setName("");
    setUrl("");
  }

  return (
    <section className="section">
      <h1>Media</h1>

      <p>
        Paste image URLs here. The
        URL is stored in Firebase.
      </p>

      <form
        className="editor-form"
        onSubmit={save}
      >
        <label>
          Name

          <input
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
            required
          />
        </label>

        <label>
          Image URL

          <input
            value={url}
            onChange={(e) =>
              setUrl(
                e.target.value
              )
            }
            required
          />
        </label>

        <button className="btn primary">
          Add media
        </button>
      </form>

      <div className="grid">
        {Object.entries(
          media || {}
        ).map(([id, item]) => (
          <div
            className="card pad"
            key={id}
          >
            <img
              src={item.url}
              alt={item.name}
              className="media-img"
            />

            <b>{item.name}</b>

            <button
              className="btn small danger"
              onClick={() =>
                dbRemove(
                  `media/${id}`
                )
              }
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

/* =========================================================
   ACTIVITY LOG
========================================================= */

function Activity() {
  const data = useRTDB(
    "activityLog",
    {}
  );

  const rows = Object.entries(
    data || {}
  ).sort(
    (a, b) =>
      (b[1].createdAt || 0) -
      (a[1].createdAt || 0)
  );

  return (
    <section className="section">
      <h1>Activity Log</h1>

      {rows.map(([id, item]) => (
        <div
          className="list-row"
          key={id}
        >
          <span>
            {item.action} —{" "}
            {item.target}
          </span>

          <small>
            {new Date(
              item.createdAt || 0
            ).toLocaleString()}
          </small>
        </div>
      ))}
    </section>
  );
}

/* =========================================================
   WEBSITE EDITOR
========================================================= */

function WebsiteEditor() {
  return (
    <section className="section">
      <h1>Website Editor</h1>

      <p>
        Use the editor modules to
        manage live Firebase content.
      </p>

      <Link
        className="btn primary"
        to="/"
      >
        Preview website
      </Link>
    </section>
  );
}

/* =========================================================
   HELPERS
========================================================= */

function Loading() {
  return (
    <div className="loading">
      Loading…
    </div>
  );
}

function Empty({ text }) {
  return (
    <div className="empty">
      {text}
    </div>
  );
}

function ProductRoute() {
  const location = useLocation();

  const id =
    location.pathname
      .split("/")
      .pop();

  return (
    <ProductDetail id={id} />
  );
}

function Support() {
  return (
    <section className="section narrow">
      <h1>Customer Service</h1>

      <p>
        Need help with an order,
        product, or service?
      </p>

      <Link
        className="btn primary"
        to="/inquiries"
      >
        Contact us
      </Link>
    </section>
  );
}

/* =========================================================
   APPLICATION ROUTES
========================================================= */

export default function App() {
  return (
    <Routes>
      {/* PUBLIC */}

      <Route
        path="/"
        element={<PublicLayout />}
      >
        <Route
          index
          element={<Home />}
        />

        <Route
          path="shop"
          element={<Shop />}
        />

        <Route
          path="shop/:id"
          element={<ProductRoute />}
        />

        <Route
          path="services"
          element={<Services />}
        />

        <Route
          path="customer-service"
          element={<Support />}
        />

        <Route
          path="inquiries"
          element={<InquiryForm />}
        />
      </Route>

      {/* AUTH */}

      <Route
        path="/login"
        element={
          <AuthPage mode="login" />
        }
      />

      <Route
        path="/register"
        element={
          <AuthPage mode="register" />
        }
      />

      {/* CUSTOMER */}

      <Route
        path="/portal"
        element={
          <CustomerGuard>
            <CustomerLayout />
          </CustomerGuard>
        }
      >
        <Route
          index
          element={<CustomerDashboard />}
        />

        <Route
          path="account"
          element={<Account />}
        />

        <Route
          path="cart"
          element={<Cart />}
        />

        <Route
          path="orders"
          element={<Orders />}
        />

        <Route
          path="messages"
          element={<Messages />}
        />

        <Route
          path="inquiries"
          element={<MyInquiries />}
        />
      </Route>

      {/* EDITOR */}

      <Route
        path="/editor"
        element={
          <EditorGuard>
            <EditorLayout />
          </EditorGuard>
        }
      >
        <Route
          index
          element={<Dashboard />}
        />

        <Route
          path="website"
          element={<WebsiteEditor />}
        />

        <Route
          path="products"
          element={
            <Crud
              type="products"
              title="Products"
            />
          }
        />

        <Route
          path="categories"
          element={
            <Crud
              type="categories"
              title="Categories"
            />
          }
        />

        <Route
          path="services"
          element={
            <Crud
              type="services"
              title="Services"
            />
          }
        />

        <Route
          path="home"
          element={<HomeEditor />}
        />

        <Route
          path="messages"
          element={<MessagesAdmin />}
        />

        <Route
          path="inquiries"
          element={<EditorInquiries />}
        />

        <Route
          path="orders"
          element={<EditorOrders />}
        />

        <Route
          path="customers"
          element={<Customers />}
        />

        <Route
          path="media"
          element={<Media />}
        />

        <Route
          path="navigation"
          element={
            <Crud
              type="navigation"
              title="Navigation"
            />
          }
        />

        <Route
          path="announcements"
          element={
            <Crud
              type="announcements"
              title="Announcements"
            />
          }
        />

        <Route
          path="settings"
          element={<Settings />}
        />

        <Route
          path="activity"
          element={<Activity />}
        />
      </Route>

      {/* FALLBACK */}

      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />
    </Routes>
  );
}
