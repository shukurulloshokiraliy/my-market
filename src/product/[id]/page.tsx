'use client';

export default function ProductDetail({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center p-8">
        <h1 className="text-5xl font-bold text-purple-600 mb-4">
          Product ID: {params.id}
        </h1>
        <p className="text-xl text-gray-600 mb-4">
          ✅ Route ishlayapti!
        </p>
        <button
          onClick={() => window.location.href = '/'}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
        >
          Bosh sahifaga qaytish
        </button>
      </div>
    </div>
  );
}