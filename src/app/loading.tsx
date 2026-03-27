export default function Loading() {
  return (
    <div className="min-h-screen bg-bleu-nuit">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero skeleton */}
        <div className="max-w-4xl mx-auto text-center mb-32">
          <div className="h-16 bg-gray-700 rounded-lg animate-pulse mb-6 max-w-3xl mx-auto" />
          <div className="h-8 bg-gray-700 rounded-lg animate-pulse mb-4 max-w-2xl mx-auto" />
          <div className="h-8 bg-gray-700 rounded-lg animate-pulse mb-10 max-w-xl mx-auto" />
          <div className="flex gap-4 justify-center">
            <div className="h-12 w-48 bg-gray-700 rounded-lg animate-pulse" />
            <div className="h-12 w-48 bg-gray-700 rounded-lg animate-pulse" />
          </div>
        </div>

        {/* Cards skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-20">
          <div className="h-80 bg-gray-700 rounded-xl animate-pulse" />
          <div className="h-80 bg-gray-700 rounded-xl animate-pulse" />
          <div className="h-80 bg-gray-700 rounded-xl animate-pulse" />
        </div>

        {/* Section skeleton */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <div className="h-12 bg-gray-700 rounded-lg animate-pulse mb-4 max-w-md mx-auto" />
          <div className="h-6 bg-gray-700 rounded-lg animate-pulse max-w-xl mx-auto" />
        </div>

        {/* More cards skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <div className="h-64 bg-gray-700 rounded-xl animate-pulse" />
          <div className="h-64 bg-gray-700 rounded-xl animate-pulse" />
          <div className="h-64 bg-gray-700 rounded-xl animate-pulse" />
        </div>
      </div>
    </div>
  );
}
