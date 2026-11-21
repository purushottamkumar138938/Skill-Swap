# SkillSwap

SkillSwap is a peer-to-peer skill exchange website. Instead of paying for a course, users trade skills with each other: you teach what you know and learn what you don't, one hour for one hour.

This is a **Web Technology mini-project** built with only **HTML, CSS and JavaScript**. It has no backend and no frameworks (no React). All data is stored in the browser using `localStorage`.

## Features

- Create an account and log in (data saved in `localStorage`)
- Browse skills with live search and category filters
- View full details of a skill and its teacher
- Match Finder that suggests people who teach what you want to learn, with "Perfect match" when the swap works both ways
- Send swap requests and track their status (Pending, Accepted, Rejected)
- Dashboard with stats for requests sent, received and accepted swaps
- Reviews and ratings with a star picker and an average rating
- Contact form and FAQ accordion
- Responsive layout for desktop, tablet and mobile

## Pages (12)

| # | Page | Purpose |
|---|------|---------|
| 1 | Home | Landing page with hero section and featured skills |
| 2 | About Us | Mission and team |
| 3 | Sign Up | Create an account with skills to teach and learn |
| 4 | Login | Log in with a saved account |
| 5 | Browse Skills | Search and filter all skills |
| 6 | Skill Detail | Details, learning points and reviews of one skill |
| 7 | My Profile | Logged-in user's info and skills |
| 8 | Dashboard | Swap statistics and recent requests |
| 9 | Match Finder | Suggested matches based on teach and learn skills |
| 10 | Swap Request | Send a swap request to a teacher |
| 11 | Reviews | Read and write reviews |
| 12 | Contact / FAQ | Contact form and common questions |

## Tech Stack

- HTML5
- CSS3 (Flexbox, Grid, media queries)
- Vanilla JavaScript (DOM, events, `localStorage`)
- Google Fonts: Fraunces and Work Sans

## Project Structure

Each page has its own `.html`, `.css` and `.js` file.

```
WT_Project/
├── home.html / home.css
├── signup.html / signup.css / signup.js
├── login.html / login.js
├── dashboard.html / dashboard.css / dashboard.js
├── match-finder.html / match-finder.css / match-finder.js
├── skill-detail.html / skill-detail.css / skill-detail.js
├── profile.html / profile.css / profile.js
├── reviews.html / reviews.css / reviews.js
├── contactus.html / contactus.css / contactus.js
└── ...
```

## How to Run

1. Clone the repository:
   ```bash
   git clone https://github.com/purushottamkumar138938/Skill-Swap.git
   ```
2. Open the project folder in VS Code.
3. Start the site with the **Live Server** extension (right-click the home page and choose "Open with Live Server").
4. Sign up first, then log in to use the Dashboard, Match Finder, Swap Request and Profile pages.

> Open every page from the same address (for example `localhost:5500`). `localStorage` is separate for each address, so an account made on one address will not be found on another.

## How Data Is Stored

There is no server or database. The browser's `localStorage` works as a small database:

| Key | What it stores |
|-----|----------------|
| `skillswapUsers` | All registered users |
| `skillswapCurrentUser` | The logged-in user |
| `skillswapRequests` | Swap requests |
| `skillswapReviews` | Reviews written by users |
| `skillswapMessages` | Contact form messages |

In a real deployment this would be replaced by a backend (for example Node.js with Express and MongoDB).

## Quick Test Account

To test quickly, open the browser console (F12) on the login page and run:

```javascript
localStorage.setItem('skillswapUsers', JSON.stringify([{ fullName: 'Test User', email: 'test@gmail.com', password: '123456', teachSkills: ['Guitar'], learnSkills: ['Spanish'] }]));
```

Then log in with `test@gmail.com` and `123456`.

## Future Improvements

- Real backend with a database and secure password hashing
- Edit Profile page
- Admin dashboard to manage users and reports
- Chat between matched users
- Linking Skill Detail reviews with the Reviews page data

## Author

**Purushottam**
B.Tech CSE, Marwadi University
GitHub: [purushottamkumar138938](https://github.com/purushottamkumar138938)
