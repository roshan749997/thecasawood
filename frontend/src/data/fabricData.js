/**
 * Fabric Color Data Structure
 * 
 * Each fabric type contains an array of color options with:
 * - code: Unique color identifier (e.g., "901")
 * - name: Display name for the color
 * - color: Hex color code for preview
 * - image: Path to fabric texture image (optional)
 */

export const fabricColors = {
    KEIBA: [
        { code: "901", name: "Ivory White", color: "#f1ede4", image: null },
        { code: "902", name: "Beige Sand", color: "#e3d7c8", image: null },
        { code: "903", name: "Warm Taupe", color: "#d4c4b0", image: null },
        { code: "907", name: "Mocha Brown", color: "#8b7355", image: null },
    ],

    MERRY: [
        { code: "701", name: "Pearl White", color: "#f5f5f5", image: null },
        { code: "703", name: "Soft Grey", color: "#d1d1d1", image: null },
        { code: "705", name: "Charcoal", color: "#6b6b6b", image: null },
        { code: "706", name: "Slate Grey", color: "#4a4a4a", image: null },
        { code: "734", name: "Deep Charcoal", color: "#2d2d2d", image: null },
        { code: "738", name: "Midnight Black", color: "#1a1a1a", image: null },
    ],

    VELVETO: [
        { code: "927", name: "Velvet Cream", color: "#f8f6f0", image: null },
        { code: "928", name: "Velvet Beige", color: "#e8dcc8", image: null },
        { code: "929", name: "Velvet Rose", color: "#d4a5a5", image: null },
        { code: "930", name: "Velvet Burgundy", color: "#8b4545", image: null },
    ],

    ABOONE: [
        { code: "801", name: "Natural Linen", color: "#f0ebe0", image: null },
        { code: "802", name: "Desert Sand", color: "#d9c7a8", image: null },
        { code: "803", name: "Caramel", color: "#b8956a", image: null },
        { code: "804", name: "Espresso", color: "#5c4a3a", image: null },
    ],
};

/**
 * Get all available fabric types
 */
export const getFabricTypes = () => Object.keys(fabricColors);

/**
 * Get colors for a specific fabric
 */
export const getColorsForFabric = (fabricType) => {
    return fabricColors[fabricType] || [];
};

/**
 * Get full color code (e.g., "KEIBA 901")
 */
export const getFullColorCode = (fabric, colorCode) => {
    return `${fabric} ${colorCode}`;
};

/**
 * Find color object by fabric and code
 */
export const findColor = (fabric, colorCode) => {
    const colors = fabricColors[fabric] || [];
    return colors.find(c => c.code === colorCode);
};
