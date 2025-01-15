# Planto

Planto is a single-page online plant store designed to solidify knowledge of HTML, CSS, and native JavaScript. The project emphasizes utilizing as much functionality of native JavaScript as possible, including functions, classes, promises, and modules. Additionally, it leverages modern CSS techniques such as grids, flexbox, positioning, and preprocessors.

## Technologies Used

The following technologies were utilized in the development of Planto:

- **HTML**: Markup language for structuring the web page.
- **CSS**: Styling language, incorporating modern techniques like grids and flexbox.
- **SCSS**: CSS preprocessor for easier and more maintainable styling.
- **JavaScript**: Native JavaScript for functionality, including ES6+ features like modules, classes, and promises.
- **Gulp**: Task runner for automating development tasks like compiling SCSS.
- **Webpack**: Module bundler for managing and packaging JavaScript modules.
- **Babel**: JavaScript compiler to ensure cross-browser compatibility.
- **npm**: Package manager for managing project dependencies.

## Features

- A fully responsive single-page design.
- Interactive UI elements implemented with native JavaScript.
- Modular and maintainable code structure.
- Modern CSS layouts using grids and flexbox.
- Automated build process using Gulp and Webpack.

## Installation and Setup

Follow these steps to set up and run the project locally:

### Prerequisites

Ensure you have the following installed on your system:

- **Node.js**: [Download Node.js](https://nodejs.org/)
- **npm**: Comes bundled with Node.js

### Clone the Repository

```bash
git clone https://github.com/Illidan777/planto
cd planto
```

### Install Dependencies

Run the following command to install all required npm packages:

```bash
npm install
```

### Development

To start the development server and watch for changes:

```bash
gulp
```

This command will:
- Compile SCSS to CSS.
- Bundle JavaScript modules.
- Launch a local development server with live reloading.


## Project Structure

```
planto/
├── dist/           # Production-ready files
├── src/            # Source files
│   ├── scss/       # SCSS files
│   │   ├── style.scss  # Main SCSS file importing all styles
│   │   ├── base/       # Reusable styles and classes
│   │   ├── libs/       # Third-party imported styles
│   │   └── modules/    # Styles for individual logical units with media queries
│   ├── js/         # JavaScript files
│   │   ├── script.js   # Main entry file importing all scripts
│   │   ├── modules/    # Modules and services
│   │   │   └── const/  # Global constants
│   ├── icons/      # Icon assets
│   ├── images/     # Image assets
│   └── index.html  # Main HTML file
├── .gitignore      # Git ignored files
├── gulpfile.js     # Gulp tasks
├── package.json    # Project dependencies
└── README.md       # Project documentation
```


Enjoy exploring and developing with Planto! If you have any questions or suggestions, feel free to contribute or reach out ;)

