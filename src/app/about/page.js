export default function AboutPage() {
    return (
      <div className="flex flex-col items-center min-h-screen bg-[#10131C] text-white px-6">
        {/* Hero Section */}
        <section className="w-full max-w-5xl text-center py-20">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            About Morphika
          </h1>
          <p className="text-lg text-gray-400 mt-6 max-w-2xl mx-auto">
            AI-driven innovation for eCommerce. Morphika helps online stores create stunning product images instantly.
          </p>
        </section>
  
        {/* What We Do Section */}
        <section className="w-full max-w-6xl grid md:grid-cols-2 gap-12 items-center py-20">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold">What We Do</h2>
            <p className="text-gray-300 text-lg">
              Morphika uses **AI-powered image generation** to revolutionize eCommerce visuals.
              We help businesses **create unique, high-quality product imagery** with just a few clicks.
            </p>
            <p className="text-gray-400">
              No need for expensive photoshoots or designers. Our AI lets you generate images that match your brand's style effortlessly.
            </p>
          </div>
          <div className="bg-gray-800 h-64 w-full rounded-lg flex items-center justify-center border border-gray-700">
            {/* Replace with real image */}
            <span className="text-gray-400">[Insert AI-generated Image Example]</span>
          </div>
        </section>
  
        {/* Our Technology Section */}
        <section className="w-full max-w-6xl grid md:grid-cols-2 gap-12 items-center py-20">
          <div className="bg-gray-800 h-64 w-full rounded-lg flex items-center justify-center border border-gray-700">
            {/* Replace with real image */}
            <span className="text-gray-400">[Insert AI-powered process visual]</span>
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl font-bold">Our Technology</h2>
            <p className="text-gray-300 text-lg">
              Morphika’s core technology is powered by **FLUX DEV**, an advanced AI model designed for product image generation.
            </p>
            <p className="text-gray-400">
              Each product is trained into a custom **LoRA model**, allowing for **realistic and adaptable imagery** tailored to your store’s needs.
            </p>
          </div>
        </section>
  
        {/* Meet the Team Section */}
        <section className="w-full max-w-6xl text-center py-20">
          <h2 className="text-4xl font-bold mb-10">Meet the Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Example Team Member - Duplicate for More */}
            <div className="bg-[#252842] p-6 rounded-lg shadow-lg text-center">
              <div className="h-24 w-24 bg-gray-700 rounded-full mx-auto"></div>
              <h3 className="mt-4 text-xl font-semibold">Hussein Ballouk</h3>
              <p className="text-sm text-gray-400">Founder & AI Engineer</p>
            </div>
            <div className="bg-[#252842] p-6 rounded-lg shadow-lg text-center">
              <div className="h-24 w-24 bg-gray-700 rounded-full mx-auto"></div>
              <h3 className="mt-4 text-xl font-semibold">[Team Member]</h3>
              <p className="text-sm text-gray-400">[Role]</p>
            </div>
            <div className="bg-[#252842] p-6 rounded-lg shadow-lg text-center">
              <div className="h-24 w-24 bg-gray-700 rounded-full mx-auto"></div>
              <h3 className="mt-4 text-xl font-semibold">[Team Member]</h3>
              <p className="text-sm text-gray-400">[Role]</p>
            </div>
          </div>
        </section>
  
        {/* Call to Action */}
        <section className="w-full max-w-4xl text-center py-20">
          <h2 className="text-4xl font-bold">Ready to transform your product visuals?</h2>
          <p className="text-lg text-gray-400 mt-4">
            Join Morphika and create **AI-powered product images** today.
          </p>
          <a 
            href="/registration"
            className="mt-6 inline-block bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-medium transition-all"
          >
            Get Started →
          </a>
        </section>
      </div>
    );
  }
  