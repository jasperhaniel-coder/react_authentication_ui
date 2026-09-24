# HanielStores Authentication UI

This is my React authentication UI assignment for SmartHub IT Center.

The project contains the main authentication pages:

* Login
* Register
* Forgot Password
* OTP Verification
* Reset Password
* Dashboard
* 404 Page

## Technologies Used

* React
* React Router
* Bootstrap
* CSS
* Vite

## Running the Project

First install the dependencies:

```bash
npm install
```

Then start the development server:

```bash
npm run dev
```

Open the local URL shown in the terminal.

## Build

To create a production build:

```bash
npm run build
```

You can also check the build locally with:

```bash
npm run preview
```

## Note

There is no backend connected yet. The authentication requests are currently simulated in `src/services/authService.js`.

For testing the OTP verification, use:

```text
123456
```

The project is structured so a real backend/API can be connected later.
