# ArammaFlix

A movie application built with Angular 20 and Server-Side Rendering (SSR).

## Features

- Movie listing
- Movie details
- Movie search
- Wishlist functionality
- Arabic language support
- Responsive design

## System Requirements

- Node.js 18 or later
- npm or yarn

## Local Installation and Setup

1. Install dependencies:
```bash
npm install
```

2. Start the local development server:
```bash
npm start
```

3. Open your browser and navigate to `http://localhost:4200/`

## Production Build

```bash
npm run build
```

## Deploy to Netlify

### Method 1: Automatic Deployment from GitHub

1. Push your code to a GitHub repository
2. Go to [Netlify](https://netlify.com)
3. Choose "New site from Git"
4. Select GitHub and choose your repository
5. Use the following settings:
   - Build command: `npm run build`
   - Publish directory: `dist/Task/browser`
6. Click "Deploy site"

### Method 2: Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Go to [Netlify](https://netlify.com)
3. Drag and drop the `dist/Task/browser` folder to the deploy area
4. Your site will be deployed automatically

## Project Structure

```
src/
├── app/
│   ├── Components/
│   │   ├── movie-details/
│   │   ├── movies/
│   │   ├── navbar/
│   │   ├── search/
│   │   └── wishlist/
│   └── Services/
│       ├── movie-service.ts
│       ├── wish-list-service.ts
│       └── language.ts
```

## Technologies Used

- Angular 20
- Angular Material
- Bootstrap 5
- Font Awesome
- Lottie Animations
- Server-Side Rendering (SSR)

## Contributing

1. Fork the project
2. Create a new feature branch
3. Make your changes
4. Submit a Pull Request

## License

This project is licensed under the MIT License.
