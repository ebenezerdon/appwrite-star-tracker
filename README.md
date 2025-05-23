# Appwrite Star Tracker ✨

A real-time GitHub star tracker for the Appwrite repository, built with React, TypeScript, and Appwrite authentication.

Live demo: [https://appwrite.ebenezerdon.com](https://appwrite.ebenezerdon.com)

![Appwrite Star Tracker](https://appwrite.ebenezerdon.com/og-image.png)

## 🌟 Features

- **Real-time Star Count**: Watch Appwrite's GitHub stars grow in real-time
- **Interactive UI**: Beautiful animations and confetti celebrations for milestones
- **GitHub Authentication**: Sign in with GitHub to avoid API rate limits
- **Repository Insights**: View contributors, latest releases, and recent pull requests
- **Responsive Design**: Works on desktop and mobile devices
- **Dark Mode Support**: Toggle between light and dark themes

## 🚀 Technologies Used

- **Frontend**: React, TypeScript, Vite
- **Styling**: TailwindCSS
- **Authentication**: Appwrite OAuth
- **Data Visualization**: Chart.js, React-ChartJS-2
- **Animations**: Canvas Confetti
- **Icons**: Lucide React
- **Date Handling**: date-fns

## 📋 Prerequisites

- Node.js 16+
- npm or yarn
- Appwrite account (for authentication)

## 🛠️ Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/appwrite-star-tracker.git
   cd appwrite-star-tracker
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn
   ```

3. Create an Appwrite project and set up OAuth with GitHub:

   - Create a project in the [Appwrite Console](https://cloud.appwrite.io)
   - Set up GitHub OAuth in the Appwrite Console
   - Update the Appwrite project ID in `src/services/appwrite.ts`

4. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## 🔧 Configuration

The application uses the following configuration:

- **Appwrite Configuration**: Located in `src/services/appwrite.ts`
- **GitHub Repository**: The app tracks the `appwrite/appwrite` repository by default, but you can modify this in `src/App.tsx`
- **Refresh Interval**: GitHub data is refreshed every 30 seconds by default, configurable in `src/App.tsx`

## 📱 Usage

1. Visit the application in your browser
2. Watch the real-time star count for the Appwrite repository
3. Sign in with GitHub to avoid API rate limits
4. Explore repository insights like contributors, releases, and pull requests
5. Share the star count with others using the share button
6. Toggle between light and dark mode using the theme switcher

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the GNU General Public License v3.0 - see the LICENSE file for details.

## 🙏 Acknowledgements

- [Appwrite](https://appwrite.io) for the awesome open-source backend
- [GitHub API](https://docs.github.com/en/rest) for providing repository data
- My humble self 🤗 [Ebenezer Don](https://github.com/ebenezerdon)
- All the amazing contributors to the Appwrite project

---

Built with ❤️ for the Appwrite community
