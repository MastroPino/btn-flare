document.addEventListener("DOMContentLoaded", function () {
    const button = document.querySelector(".btn-flare");
    const flare = document.querySelector(".btn-flare__flare");
    const borderLightBlur1 = document.querySelector(
        ".btn-flare__border-blur:nth-child(1)"
    );
    const borderLightBlur2 = document.querySelector(
        ".btn-flare__border-blur:nth-child(2)"
    );

    if (!button || !flare || !borderLightBlur1 || !borderLightBlur2) {
        console.error("Button, flare, or border light elements not found");
        return;
    }

    // Initialize flare position to default (right side of button)
    const buttonRect = button.getBoundingClientRect();
    const defaultX = buttonRect.width - 102; // Right side, accounting for 204px flare width
    flare.style.transform = `translateX(${defaultX}px) translateZ(0px)`;

    let currentX = defaultX;
    let targetX = defaultX;
    let animationId = null;
    let isMouseOver = false;

    // Smooth animation function with continuous loop
    function animate() {
        const diff = targetX - currentX;

        // Use lerp for smooth movement
        currentX += diff * 0.25; // Increased for more responsive movement

        // Apply the smooth position - following huly.io structure
        flare.style.transform = `translateX(${currentX}px) translateZ(0px)`;

        // Continue animation while mouse is over button
        if (isMouseOver) {
            animationId = requestAnimationFrame(animate);
        } else {
            animationId = null;
        }
    }

    // Mouse move handler for flare effect
    button.addEventListener("mousemove", function (e) {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const buttonWidth = rect.width;
        const centerX = buttonWidth / 2;

        // Calculate flare position centered on cursor
        // The flare is 204px wide, so we center it on the cursor
        targetX = x - 102; // Center the 204px flare on cursor

        // Calculate border light opacity based on cursor position
        const distanceFromCenter = Math.abs(x - centerX);
        const maxDistance = buttonWidth / 2;
        const normalizedDistance = distanceFromCenter / maxDistance;

        // Control border light elements based on cursor position
        if (x < centerX) {
            // Mouse is on the left side - show second blur (left), hide first (right)
            borderLightBlur2.style.opacity = Math.min(
                1,
                normalizedDistance * 2
            );
            borderLightBlur1.style.opacity = 0;
        } else {
            // Mouse is on the right side - show first blur (right), hide second (left)
            borderLightBlur2.style.opacity = 0;
            borderLightBlur1.style.opacity = Math.min(
                1,
                normalizedDistance * 2
            );
        }

        // Add glow effect at the edges (within 25px from edges)
        if (x < 25) {
            button.classList.add("btn-flare--glow-left");
            button.classList.remove("btn-flare--glow-right");
        } else if (x > buttonWidth - 25) {
            button.classList.add("btn-flare--glow-right");
            button.classList.remove("btn-flare--glow-left");
        } else {
            button.classList.remove(
                "btn-flare--glow-left",
                "btn-flare--glow-right"
            );
        }
    });

    // Mouse enter handler - start animation loop
    button.addEventListener("mouseenter", function () {
        isMouseOver = true;

        // Start animation loop if not already running
        if (!animationId) {
            animationId = requestAnimationFrame(animate);
        }
    });

    // Mouse leave handler - animate back to default position
    button.addEventListener("mouseleave", function () {
        isMouseOver = false;

        // Cancel any ongoing animation
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }

        // Set target to default position (right side)
        const buttonRect = button.getBoundingClientRect();
        const defaultX = buttonRect.width - 102;
        targetX = defaultX;

        // Continue animation until we reach default position
        function animateToDefault() {
            const diff = targetX - currentX;

            // Check if we're close enough to the target (within 0.5px)
            if (Math.abs(diff) < 0.5) {
                // Snap to final position and stop animation
                currentX = defaultX;
                flare.style.transform = `translateX(${defaultX}px) translateZ(0px)`;
                animationId = null;
                return;
            }

            // Continue smooth movement
            currentX += diff * 0.15; // Slightly slower for a more elegant return
            flare.style.transform = `translateX(${currentX}px) translateZ(0px)`;

            // Continue animation
            animationId = requestAnimationFrame(animateToDefault);
        }

        // Start the return animation
        animationId = requestAnimationFrame(animateToDefault);

        // Reset border light elements to default
        borderLightBlur1.style.opacity = "1";
        borderLightBlur2.style.opacity = "0";

        // Remove glow effects
        button.classList.remove(
            "btn-flare--glow-left",
            "btn-flare--glow-right"
        );
    });

    // Add click handler for demonstration
    button.addEventListener("click", function () {
        console.log("Try it free button clicked!");
        // Add your click logic here
    });
});
