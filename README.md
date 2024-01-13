# Stacks4Wax

This project, Stacks of Wax, is a web application designed to allow music enthusiasts to browse, search, and share vinyl record collections. It embodies a community-driven ethos, providing a platform for both anonymous browsing and enhanced features for registered members.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

The Stacks of Wax web app aims to provide users with:

    The ability to browse and search through a wide array of vinyl records.
    Filtering options based on music genre, popularity, and artist/band.
    An engaging experience for both anonymous users and registered members.
    Special features for registered members, like creating and managing personal vinyl lists, rating and reviewing other collections.

### Screenshot

![](./public/screenshots/welcomesc.png alt="welcome")
![](./public/screenshots/dashboardsc.png alt="dashboard")

### Links

- Solution URL: [Add solution URL here](https://github.com/Wakarende/stacks4wax)
- Live Site URL: This live site will be available upon completion of the project. Currently, this project is in a rebuild phase for enhancements and feature additions

## My process

### Built with

- [TailwindCSS](https://tailwindcss.com/) - CSS framework
- [Next.js](https://nextjs.org/) - React framework
- [Supabase] (https://supabase.com/) - Database

### Local Setup Instructions

#### Prerequisites

Before you begin, ensure you have the following installed on your system:
    [Node.js](https://nodejs.org/en/download)(v12 or later)
    npm (usually comes with Node.js)
    A code editor of your choice (e.g., VSCode)

#### Clone the Repository 

First, clone the repository to your local machine:

```bash
    git clone https://github.com/yourusername/stacksofwax.git
    cd stacks4wax
```

#### Install Dependencies

```bash
npm install
```

#### Setting Up Supabase

- Create a Supabase account and a new project at [Supabase](https://supabase.com/).
- Once your project is created, go to the 'Settings' tab in your Supabase project dashboard and find your project's API keys.
- Create a .env.local file in the root of your project and add your Supabase URL and Anon Key:

    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key  
    ```

#### Running the Application
After setting up the environment variables, start the application by running:

```bash
npm run dev
```
Absolutely! Below is a sample section you could add to your README to provide clear instructions for setting up your "Stacks of Wax" application locally using Next.js, Tailwind CSS, and Supabase. Make sure to replace any placeholder text with the actual details or requirements of your project.
Local Setup Instructions

To set up and run "Stacks of Wax" locally, follow these steps:
Prerequisites

Before you begin, ensure you have the following installed on your system:

    Node.js (v12 or later)
    npm (usually comes with Node.js)
    A code editor of your choice (e.g., VSCode)

Clone the Repository

First, clone the repository to your local machine:

bash

git clone https://github.com/yourusername/stacksofwax.git
cd stacksofwax

Install Dependencies

Next, install the necessary dependencies:

bash

npm install

This will install Next.js, Tailwind CSS, and other required packages.
Setting Up Supabase

    Create a Supabase account and a new project at Supabase.

    Once your project is created, go to the 'Settings' tab in your Supabase project dashboard and find your project's API keys.

    Create a .env.local file in the root of your project and add your Supabase URL and Anon Key:

    env

    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

Running the Application

After setting up the environment variables, start the application by running:

bash

npm run dev

This will start the Next.js development server. Open the [Link](http://localhost:3000) in your browser to see the application.

### What I learned

Through the development of the "Stacks of Wax" project, I embarked on a significant learning journey, diving into Next.js, Tailwind CSS, and Supabase.  Here's what this journey has taught me so far:

#### Exploring Full-stack Capabilities with Next.js

- **Server-Side Rendering (SSR) and Static Generation:** Next.js introduced me to concepts like SSR and Static Generation, which are crucial for enhancing the performance and SEO of web applications. While implementing these features, I'm gaining a better understanding of how they contribute to a more efficient user experience, especially for the vinyl record listings.
- **API Routes:** Integrating backend processes using Next.js's API routes is helping me appreciate the convenience of handling server-side code in the same environment as the frontend. This approach is proving invaluable in evolving "Stacks of Wax" into a full-stack application.
- **Dynamic Routing:** I'm currently learning to leverage dynamic routing in Next.js, which I anticipate will greatly enhance the site's navigation by allowing individual pages for each vinyl record.

#### Discovering Tailwind CSS for Styling

- **Utility-first Framework:** Tailwind's utility-first framework is a new approach for me. It's teaching me to rapidly develop UI components and maintain a consistent design throughout the application. I'm finding it particularly useful in tackling the intricate layouts, like the record collection grids.
- **Responsive Design:** Tailwind's responsive design utilities are showing me a streamlined way to ensure the application is functional and visually appealing across various devices. This learning is ongoing as I refine the UI.

#### Delving into Supabase for Backend Services

- **Understanding Relational Databases:** Working with Supabase, a powerful relational database, I'm learning how to efficiently structure and query related data. This is essential for linking users, vinyl records, and reviews in our app.

- **Data Management and Integrity:** I'm getting hands-on experience with importing data and setting up constraints. This helps ensure the accuracy and consistency of the vinyl records information in our database.

- **Implementing Real-time Features:** Supabase's real-time capabilities are new to me. I'm learning how to apply these to provide live updates in the app, enhancing the user experience by showing changes in the vinyl collections instantaneously.

- **Advanced Querying Techniques:** I'm exploring how to use Supabase for complex queries, such as combining data from multiple tables.

### Continued development

- **Music Streaming Integration:** I plan to explore integrating a music streaming service or API that allows for the playback of vinyl track listings. This integration will enable users not just to view and manage their collections but also to listen to them.
- **Community and Social Features:** Longer-term, this feature could pave the way for more community-driven functionalities, like sharing playlists or favorite tracks, thus fostering a more connected user community within Stacks4Wax

### Author

- Name: Joy Kirii
- Email: <joykirii@gmail.com>
