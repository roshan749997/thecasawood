# Professional Fabric Color Selection System

## Overview
A complete, production-ready fabric and color selection system for furniture e-commerce, featuring premium UI/UX similar to Amazon, Pepperfry, and Urban Ladder.

## Features

### ✅ Fabric Type Selection
- Multiple fabric options (KEIBA, MERRY, VELVETO, ABOONE)
- Single selection with visual feedback
- Premium border and background for active state
- Smooth transitions

### ✅ Color Swatches
- 36px × 36px color boxes
- Real color preview with hex codes
- Hover effects and tooltips
- Active state indication with checkmark
- Responsive grid layout

### ✅ State Management
- React hooks for fabric/color selection
- Automatic image updates
- Price synchronization
- Cart integration

### ✅ Mobile Responsive
- Adapts to all screen sizes
- Touch-friendly interactions
- Optimized layout for mobile

## File Structure

```
frontend/
├── src/
│   ├── components/
│   │   └── ColorSelector.jsx       # Reusable color selection component
│   ├── data/
│   │   └── fabricData.js           # Centralized fabric/color data
│   └── pages/
│       └── ProductDetail.jsx       # Product page with integration

backend/
├── models/
│   ├── Product.js                  # Product schema with fabric fields
│   └── Cart.js                     # Cart schema with color data
└── scripts/
    └── seed.js                     # Sample data with fabric types
```

## Data Structure

### Fabric Colors (`fabricData.js`)

```javascript
const fabricColors = {
  KEIBA: [
    { code: "901", name: "Ivory White", color: "#f1ede4", image: null },
    { code: "902", name: "Beige Sand", color: "#e3d7c8", image: null },
    // ... more colors
  ],
  MERRY: [
    { code: "701", name: "Pearl White", color: "#f5f5f5", image: null },
    // ... more colors
  ],
  // ... more fabrics
};
```

### Product Schema

```javascript
{
  fabricTypes: ['KEIBA', 'MERRY'],     // Available fabric types
  defaultFabric: 'KEIBA',              // Default selection
  defaultColor: '901',                 // Default color code
  // ... other product fields
}
```

### Cart Item Schema

```javascript
{
  product: ObjectId,
  quantity: Number,
  variantName: String,                 // e.g., "3 Seater"
  fabric: String,                      // e.g., "KEIBA"
  colorCode: String,                   // e.g., "KEIBA 901"
  colorData: {
    code: String,
    name: String,
    color: String,
    image: String
  }
}
```

## Usage

### 1. Add Fabric Types to Product

In your seed data or admin panel:

```javascript
{
  name: "3 seater sofa",
  fabricTypes: ['KEIBA', 'VELVETO'],
  defaultFabric: 'KEIBA',
  defaultColor: '901',
  // ... other fields
}
```

### 2. Use ColorSelector Component

```jsx
import ColorSelector from '../components/ColorSelector';

<ColorSelector
  availableFabrics={product.fabricTypes}
  defaultFabric={product.defaultFabric}
  defaultColor={product.defaultColor}
  onColorChange={handleColorChange}
/>
```

### 3. Handle Color Changes

```javascript
const handleColorChange = (fabric, colorCode, colorData) => {
  setSelectedFabric(fabric);
  setSelectedColorCode(colorCode);
  setSelectedColorData(colorData);
  
  // Optional: Update product image
  if (colorData.image) {
    // Update main image
  }
};
```

### 4. Add to Cart with Color Data

```javascript
await cartAPI.add({
  productId: id,
  quantity: 1,
  variantName: "3 Seater",
  fabric: "KEIBA",
  colorCode: "KEIBA 901",
  colorData: {
    code: "901",
    name: "Ivory White",
    color: "#f1ede4"
  }
});
```

## Customization

### Adding New Fabrics

Edit `frontend/src/data/fabricData.js`:

```javascript
export const fabricColors = {
  // ... existing fabrics
  NEWFABRIC: [
    { code: "101", name: "Custom Color", color: "#hexcode", image: null }
  ]
};
```

### Styling

The component uses Tailwind CSS. Key classes:

- Active fabric button: `border-[#8b5e3c] bg-[#fff8f5]`
- Color swatch: `w-9 h-9 rounded-md`
- Selected color: `ring-2 ring-[#8b5e3c] ring-offset-2`

### Adding Fabric Images

1. Upload fabric texture images to your CDN
2. Update `fabricData.js`:

```javascript
{ 
  code: "901", 
  name: "Ivory White", 
  color: "#f1ede4", 
  image: "/fabrics/keiba/901.jpg" 
}
```

3. The component will automatically use the image if provided

## API Integration

### Backend Routes

The cart routes automatically handle fabric/color data:

```javascript
POST /api/cart
{
  "productId": "...",
  "quantity": 1,
  "fabric": "KEIBA",
  "colorCode": "KEIBA 901",
  "colorData": { ... }
}
```

### Response Format

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "product": { ... },
        "quantity": 1,
        "fabric": "KEIBA",
        "colorCode": "KEIBA 901",
        "colorData": {
          "code": "901",
          "name": "Ivory White",
          "color": "#f1ede4"
        }
      }
    ]
  }
}
```

## Best Practices

1. **Performance**: Color data is lightweight and cached in state
2. **Accessibility**: All color swatches have proper ARIA labels
3. **Mobile**: Touch targets are 36px+ for easy tapping
4. **UX**: Smooth transitions (200ms) for all interactions
5. **Scalability**: Add new fabrics without code changes

## Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Full support

## Future Enhancements

- [ ] Fabric texture images
- [ ] Color search/filter
- [ ] Recently selected colors
- [ ] Color comparison mode
- [ ] AR preview integration

## Support

For issues or questions, refer to the component documentation in the code comments.

---

**Built with ❤️ for TheCasawood Furniture**
