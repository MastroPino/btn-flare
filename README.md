# btn-flare

A faithful recreation of the "TRY IT FREE" button from huly.io with the bleeding flare effect that follows the mouse cursor.

## Features

-   **Exact Visual Match**: Recreates the huly.io button design with accurate colors, gradients, and styling
-   **Bleeding Flare Effect**: A white flare element that follows the mouse cursor across the button
-   **Smooth Animations**: CSS transitions and cubic-bezier easing for smooth interactions
-   **Modern Design**: Uses modern CSS gradients, shadows, and effects
-   **Responsive**: Works across different screen sizes

## Project Structure

```
btn-flare/
├── index.html          # Main HTML structure
├── styles.css          # All styling including button and flare effects
├── script.js           # JavaScript for mouse interaction and flare positioning
├── bg.webp             # Background image
├── test.html           # Test page
├── README.md           # This file
└── .github/
    └── copilot-instructions.md  # Copilot workspace instructions
```

## How It Works

### HTML Structure

The button consists of:

-   A container `button` element with class `btn-flare`
-   A text span with class `btn-flare__text`
-   A flare div with class `btn-flare__flare`

### CSS Styling

-   **Button**: Uses gradients and borders to match huly.io design
-   **Flare**: Positioned absolutely, uses gradient for the bleeding effect
-   **Animations**: Smooth transitions on hover and interaction

### JavaScript Logic

-   Tracks mouse movement over the button
-   Calculates relative position within the button
-   Moves the flare element to follow the cursor
-   Handles mouse enter/leave events for smooth transitions

## Getting Started

1. **Open the project**: Make sure you have VS Code with Live Server extension installed
2. **Launch Live Server**: Right-click on `index.html` and select "Open with Live Server"
3. **Test the button**: Move your mouse over the button to see the flare effect

## Development

The flare effect is achieved by:

1. Listening to `mousemove` events on the button
2. Calculating the mouse position relative to the button
3. Moving the flare element using CSS transforms
4. Applying smooth transitions for natural movement

## Browser Support

This project uses modern CSS features and should work in all modern browsers:

-   Chrome 60+
-   Firefox 55+
-   Safari 12+
-   Edge 79+

## Demo

[View Live Demo](https://mastropino.github.io/btn-flare/)

## License

This project is for educational purposes to demonstrate CSS and JavaScript animation techniques.
