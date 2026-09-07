# Marlene-s-Jewelry-
Oo—ito na ang buong README.md, isang buo para copy-paste mo diretso sa GitHub.

Marlene’s Jewelry

Marlene’s Jewelry is an online jewelry shopping and services portal designed to provide customers with a modern digital shopping experience.

The platform is structured into three main areas:

* Public Website
* Customer Portal
* Editor Portal

⸻

🌐 Public Website

The public website is accessible to everyone.

Pages

* Home
* Shopping Center
* Services
* Customer Service
* Inquiries
* Login
* Create New Account

Public Website Flow

Home
 │
 ├── Shopping Center
 │
 ├── Services
 │
 ├── Customer Service
 │
 ├── Inquiries
 │
 └── Login
       │
       └── Customer Portal

⸻

👤 Customer Portal

The Customer Portal is designed for registered customers.

Customer Features

* Dashboard
* Account
* Shopping Cart
* Orders
* Messages
* Inquiries

Customer Portal Flow

Customer
   │
   ▼
Login
   │
   ▼
Customer Portal
   │
   ├── Dashboard
   ├── Account
   ├── Cart
   ├── Orders
   ├── Messages
   └── Inquiries

⸻

🔐 Editor Portal

The Editor Portal is a separate protected area for authorized website administrators/editors.

The Editor Portal is intended to manage the content and operations of Marlene’s Jewelry.

Editor Features

* Dashboard
* Website Editor
* Home Page
* Products
* Categories
* Services
* Messages
* Inquiries
* Orders
* Customers
* Media
* Navigation
* Announcements
* Website Settings
* Activity Log

Editor Portal Flow

Editor
   │
   ▼
Secure Login
   │
   ▼
Editor Portal
   │
   ├── Dashboard
   │
   ├── Website Editor
   │
   ├── Home Page
   │
   ├── Products
   │
   ├── Categories
   │
   ├── Services
   │
   ├── Messages
   │
   ├── Inquiries
   │
   ├── Orders
   │
   ├── Customers
   │
   ├── Media
   │
   ├── Navigation
   │
   ├── Announcements
   │
   ├── Website Settings
   │
   └── Activity Log

⸻

🏗️ System Architecture

                         MARLENE’S JEWELRY
                                │
                ┌───────────────┴───────────────┐
                │                               │
         PUBLIC WEBSITE                     LOGIN
                │                               │
       ┌────────┼────────┐              ┌───────┴───────┐
       │        │        │              │               │
      SHOP   SERVICES  SUPPORT       CUSTOMER        EDITOR
                                       PORTAL         PORTAL
                                         │               │
                                         │               │
                                  Customer Data     Website Management
                                         │               │
                                         └───────┬───────┘
                                                 │
                                             DATABASE

⸻

💻 Technology

The current project uses:

* React
* Vite
* React Router
* JavaScript
* CSS
* Browser Local Storage for the initial authentication prototype

⸻

📁 Project Structure

marlenes-jewelry/
│
├── package.json
├── index.html
├── README.md
│
└── src/
    │
    ├── main.jsx
    ├── App.jsx
    ├── styles.css
    │
    ├── layouts/
    │   ├── PublicLayout.jsx
    │   ├── CustomerLayout.jsx
    │   └── EditorLayout.jsx
    │
    └── pages/
        │
        ├── public/
        │   ├── Home.jsx
        │   ├── ShoppingCenter.jsx
        │   ├── Services.jsx
        │   ├── CustomerService.jsx
        │   └── Inquiries.jsx
        │
        ├── customer/
        │   ├── Dashboard.jsx
        │   ├── Account.jsx
        │   ├── Cart.jsx
        │   ├── Orders.jsx
        │   ├── Messages.jsx
        │   └── CustomerInquiries.jsx
        │
        └── editor/
            ├── Dashboard.jsx
            ├── WebsiteEditor.jsx
            ├── Products.jsx
            ├── Categories.jsx
            ├── Services.jsx
            ├── HomePage.jsx
            ├── Messages.jsx
            ├── Inquiries.jsx
            ├── Orders.jsx
            ├── Customers.jsx
            ├── Media.jsx
            ├── Navigation.jsx
            ├── Announcements.jsx
            ├── WebsiteSettings.jsx
            └── ActivityLog.jsx

⸻

🔗 Website Routes

Public Routes

/
 /shop
 /services
 /support
 /inquiries

Authentication Routes

/login
/register

Customer Routes

/portal
/portal/account
/portal/cart
/portal/orders
/portal/messages
/portal/inquiries

Editor Routes

/editor
/editor/website
/editor/home
/editor/products
/editor/categories
/editor/services
/editor/messages
/editor/inquiries
/editor/orders
/editor/customers
/editor/media
/editor/navigation
/editor/announcements
/editor/settings
/editor/activity

⸻

🔑 Current Authentication

The current prototype uses browser localStorage to demonstrate the portal system.

The system currently distinguishes between:

customer
editor

Customers are directed to:

/portal

Editors are directed to:

/editor

Unauthorized users are redirected to the appropriate login or customer portal.

⸻

⚠️ Production Authentication

The current localStorage authentication is only intended for development and prototype testing.

It should not be used as the final production authentication system.

The production version should use secure authentication such as:

* Firebase Authentication
* Firestore
* Firebase Security Rules
* Role-based access control

The final system should ensure that customers cannot access the Editor Portal simply by changing browser data.

⸻

🛍️ Future Shopping System

The Shopping Center will eventually support:

* Jewelry products
* Product images
* Product descriptions
* Product prices
* Product categories
* Product availability
* Shopping cart
* Checkout
* Order creation
* Order status
* Customer order history

⸻

💬 Customer Service System

The customer service system will eventually support:

* Customer messages
* Customer inquiries
* Conversation history
* Support responses
* Inquiry status
* Customer notifications

⸻

🧑‍💼 Future Editor / CMS System

The Editor Portal will eventually become the management system for the entire website.

Authorized editors will be able to manage:

Products

* Add products
* Edit products
* Delete products
* Change prices
* Manage inventory
* Upload product images

Categories

* Create categories
* Rename categories
* Remove categories
* Organize products

Homepage

* Edit homepage sections
* Change headlines
* Change descriptions
* Manage featured products
* Manage promotional content

Services

* Add services
* Edit services
* Remove services

Media

* Upload images
* Manage website images
* Manage product images

Navigation

* Manage website navigation
* Add navigation items
* Remove navigation items
* Change navigation order

Announcements

* Create announcements
* Edit announcements
* Publish announcements
* Remove announcements

Customer Management

* View customers
* Manage customer accounts
* View customer activity

Order Management

* View orders
* Update order status
* Manage customer orders

Activity Log

The system will eventually record important administrative actions.

Example:

Editor logged in
Product created
Product updated
Product deleted
Order status changed
Homepage updated
Announcement published

⸻

🗄️ Planned Database Architecture

The future production database can be organized approximately as:

users/
│
├── customer accounts
└── editor accounts
products/
│
├── product information
├── prices
├── categories
├── inventory
└── images
categories/
services/
orders/
│
├── customer
├── products
├── total
└── status
messages/
inquiries/
media/
announcements/
settings/
activityLogs/

⸻

🔐 Planned Security Architecture

The final system should use role-based access control.

                 AUTHENTICATION
                       │
             ┌─────────┴─────────┐
             │                   │
          CUSTOMER             EDITOR
             │                   │
             ▼                   ▼
      Customer Portal      Editor Portal
             │                   │
             ▼                   ▼
      Customer Data        Website Management

Customers should only have access to their own customer information, cart, orders, messages, and inquiries.

Editors should have access according to their assigned permissions.

⸻

📱 Responsive Design

The website is designed to support:

* Mobile phones
* Tablets
* iPad
* Desktop computers

The layout automatically adjusts for smaller screen sizes.

⸻

🚀 Development

Install the project dependencies:

npm install

Start the development server:

npm run dev

Create a production build:

npm run build

Preview the production build:

npm run preview

⸻

☁️ Deployment

The project can eventually be deployed through a hosting service such as Render, Vercel, or another compatible web hosting platform.

The general deployment architecture is:

GitHub
   │
   ▼
Web Hosting
   │
   ▼
Marlene’s Jewelry Website
   │
   ▼
Firebase
   │
   ├── Authentication
   ├── Database
   └── Security Rules

⸻

🧪 Current Development Stage

The current stage focuses on building the complete website architecture first.

The following foundations are being established:

* Public website
* Customer Portal
* Editor Portal
* Navigation
* Routing
* Responsive layouts
* Authentication flow
* Portal separation

The actual database-backed CMS/editing functionality will be implemented after the architecture has been tested.

⸻

🛠️ Development Roadmap

Phase 1 — Website Architecture

* [x]	Public Website
* [x]	Customer Portal structure
* [x]	Editor Portal structure
* [x]	Routing
* [x]	Navigation
* [x]	Responsive layout

Phase 2 — Authentication

* [ ]	Firebase Authentication
* [ ]	Customer registration
* [ ]	Customer login
* [ ]	Editor login
* [ ]	Password recovery
* [ ]	Role-based access control
* [ ]	Secure session management

Phase 3 — Database

* [ ]	Customer database
* [ ]	Product database
* [ ]	Categories
* [ ]	Services
* [ ]	Orders
* [ ]	Messages
* [ ]	Inquiries
* [ ]	Website settings

Phase 4 — Shopping Center

* [ ]	Product catalog
* [ ]	Product pages
* [ ]	Product images
* [ ]	Cart
* [ ]	Checkout
* [ ]	Orders

Phase 5 — Customer Service

* [ ]	Messaging
* [ ]	Inquiries
* [ ]	Support responses
* [ ]	Notifications

Phase 6 — Editor / CMS

* [ ]	Website Editor
* [ ]	Homepage editor
* [ ]	Product manager
* [ ]	Category manager
* [ ]	Service manager
* [ ]	Media library
* [ ]	Navigation editor
* [ ]	Announcement manager
* [ ]	Website settings
* [ ]	Activity log

Phase 7 — Production

* [ ]	Security review
* [ ]	Database security rules
* [ ]	Authentication testing
* [ ]	Mobile testing
* [ ]	Tablet testing
* [ ]	Desktop testing
* [ ]	Production deployment
* [ ]	Final error testing

⸻

🎯 Project Goal

The goal of Marlene’s Jewelry is to create a complete online jewelry business platform where customers can discover products, communicate with the business, manage their accounts, and track their orders.

The Editor Portal will provide authorized administrators with a centralized system for managing the website and business content.

⸻

👑 Brand

Marlene’s Jewelry

Online Jewelry Shopping & Services Portal

⸻

License

This project is intended for the Marlene’s Jewelry website and business platform.

