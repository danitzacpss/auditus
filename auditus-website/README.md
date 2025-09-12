This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Environment Setup

1. Copy the environment file and configure your API keys:
```bash
cp .env.example .env.local
```

2. Configure Google Maps API:
   - Get your API key from [Google Cloud Console](https://developers.google.com/maps/documentation/javascript/get-api-key)
   - Enable the following APIs:
     - Maps JavaScript API
     - Places API (optional)
   - Add your API key to `.env.local`:
```bash
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

### Development Server

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Features

### Google Maps Integration
- **Interactive Maps**: Real Google Maps integration with custom markers
- **Location Display**: Shows business location with precise coordinates
- **Click-to-Navigate**: Click on map to open Google Maps for directions
- **Responsive Design**: Maps adapt to different screen sizes
- **Fallback Support**: Graceful fallback when API key is not configured
- **Loading States**: Smooth loading animations while maps initialize
- **Error Handling**: User-friendly error messages for API issues

**Location Details:**
- Address: Aníbal Pinto 486, Oficina 403, Concepción, Chile
- Coordinates: -36.8264923, -73.0495834
- Business: Centro Auditus - Lavado de Oídos

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
