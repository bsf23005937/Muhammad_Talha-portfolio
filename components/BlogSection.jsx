import Image from 'next/image';
import Link from 'next/link';

export default function BlogSection({ posts = [] }) {
  const featuredPost = posts.find((post) => post.featured) || posts[0];
  const gridPosts = featuredPost ? posts.filter((post) => post.slug !== featuredPost.slug) : [];

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-200 bg-white text-xs font-bold text-gray-600 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#A47DFF]"></span>
            Latest From Muhammad Talha Portfolio
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight leading-tight">
            Insights and Stories Shaping <span className="text-[#A47DFF]">The Future of AI</span>
          </h1>
          <p className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed">
            Stay updated with trends, tutorials, and real-world examples of how Muhammad Talha Portfolio transforms creativity, productivity, and business with AI.
          </p>
        </div>

        {/* Featured Post */}
        {featuredPost ? (
        <div className="mb-16 md:mb-24">
          <Link href={`/blog/${featuredPost.slug}`} className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 bg-gradient-to-br from-[#F8F9FF] to-[#E6E9FF] rounded-[2.5rem] p-6 md:p-10 items-center group cursor-pointer hover:shadow-2xl transition-all duration-500 border border-white/50 backdrop-blur-sm block">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] shadow-lg">
              <Image 
                src={featuredPost.image}
                alt={featuredPost.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="inline-block px-4 py-1.5 rounded-full bg-[#A47DFF]/10 text-[#A47DFF] text-sm font-bold uppercase tracking-widest">Featured Post</div>
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 group-hover:text-[#A47DFF] transition-colors duration-300 tracking-tight leading-[1.1]">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-500 text-lg md:text-xl leading-relaxed font-semibold opacity-80">
                  {featuredPost.description}
                </p>
              </div>
              
              <div className="flex items-center gap-4 pt-6 border-t border-gray-300/40">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#A47DFF] to-[#B480FF] text-white border-4 border-white shadow-md flex items-center justify-center font-bold">
                   SX
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-lg">{featuredPost.author}</div>
                  <div className="text-sm text-gray-400 font-bold uppercase tracking-wider">{featuredPost.date} - {featuredPost.readTime}</div>
                </div>
                <div className="ml-auto">
                    <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-black text-white transition-all duration-500 group-hover:bg-[#A47DFF] group-hover:rotate-45 shadow-lg">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
        ) : (
          <div className="mb-16 rounded-[2rem] border border-gray-100 bg-gray-50 p-10 text-center">
            <p className="text-lg font-bold text-gray-500">No published blog posts yet.</p>
          </div>
        )}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 md:gap-y-16 mb-24">
          {gridPosts.map((blog) => (
            <Link key={blog.slug} href={`/blog/${blog.slug}`} className="group cursor-pointer block">
              <div className="relative aspect-[1.4/1] overflow-hidden rounded-[2rem] mb-6 shadow-sm border border-gray-100">
                <Image 
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="space-y-4">
                <div className="text-sm font-bold text-[#A47DFF] uppercase tracking-wider">{blog.category}</div>
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-[#A47DFF] transition-colors duration-300 tracking-tight leading-tight">
                  {blog.title}
                </h3>
                <p className="text-gray-500 font-medium leading-relaxed line-clamp-2">
                  {blog.description}
                </p>
                
                <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#A47DFF] to-[#B480FF] text-white border-2 border-white shadow-sm shrink-0 flex items-center justify-center text-xs font-bold">
                    SX
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-gray-900 group-hover:text-[#A47DFF] transition-colors truncate">Portfolio Notes</div>
                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">{blog.date}</div>
                  </div>
                  <div className="ml-auto">
                     <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 border border-gray-100 text-gray-900 transition-all duration-300 group-hover:bg-[#A47DFF] group-hover:text-white shadow-sm group-hover:scale-110">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
