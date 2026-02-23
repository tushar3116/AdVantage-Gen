# AdVantage-Gen

AdVantage-Gen is a powerful AI-driven application designed to streamline the ad creation process. It leverages advanced generative AI models to create compelling ad copy, tags, and images, helping businesses and marketers generate high-quality advertising content effortlessly.

## distinct Features

- **Ad Copy Generation**: Generate engaging and persuasive ad copy tailored to your product or service.
- **Tag Generation**: Automatically generate relevant tags to improve ad visibility and targeting.
- **Image Generation**: Create stunning, high-quality ad images using Stability AI.
- **User-Friendly Interface**: A clean and intuitive frontend built with React for a seamless user experience.
- **Robust Backend**: A secure and scalable backend powered by Node.js and Express.

## Tech Stack

### Frontend

- **React**: JavaScript library for building user interfaces.
- **Vite**: Next-generation frontend tooling.
- **Tailwind CSS** (if applicable based on the design descriptions in history): Utility-first CSS framework for rapid UI development.

### Backend

- **Node.js**: JavaScript runtime environment.
- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB**: NoSQL database for flexible data storage.
- **Cloudinary**: Cloud-based image and video management services.
- **Google Generative AI**: For text and tag generation.
- **Stability AI**: For image generation.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB instance
- Cloudinary account
- API keys for Google Generative AI and Stability AI

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/tushar3116/AdVantage-Gen-Copy.git
    cd AdVantage-Gen-Copy
    ```

2.  **Install dependencies:**
    - **Backend:**

      ```bash
      cd backend
      npm install
      ```

    - **Frontend:**
      ```bash
      cd ../frontend
      npm install
      ```

3.  **Configuration:**
    - Create a `.env` file in the `backend` directory and add your environment variables:
      ```env
      PORT=5000
      MONGODB_URI=your_mongodb_uri
      CLOUDINARY_CLOUD_NAME=your_cloud_name
      CLOUDINARY_API_KEY=your_api_key
      CLOUDINARY_API_SECRET=your_api_secret
      GEMINI_API_KEY=your_gemini_api_key
      STABILITY_API_KEY=your_stability_api_key
      ```

### Running the Application

1.  **Start the backend server:**

    ```bash
    cd backend
    npm start
    ```

2.  **Start the frontend development server:**

    ```bash
    cd frontend
    npm run dev
    ```

3.  Open your browser and navigate to `http://localhost:5173` (or the port specified by Vite).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open-source and available under the [MIT License](LICENSE).
