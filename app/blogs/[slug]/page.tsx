"use client";

import React from "react";
import {
  FaCalendarAlt,
  FaUser,
  FaClock,
  FaArrowLeft,
  FaShare,
  FaBookmark,
  FaHeart,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
} from "react-icons/fa";

interface BlogEntry {
  title: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  gradient: string;
}

export default function BlogPost({ blogId = 1 }: { blogId?: number }) {
  // Mock blog data - in real app, this would come from props or API
  const blogData: Record<number, BlogEntry> = {
    1: {
      title: "The Future of Remote Work: How AI is Transforming Tech Hiring",
      content: `
        <p>The landscape of remote work has evolved dramatically over the past few years, and artificial intelligence is now playing a pivotal role in reshaping how companies approach tech hiring. As we move deeper into 2025, the intersection of AI and remote recruitment is creating unprecedented opportunities for both employers and developers worldwide.</p>

        <h3>The AI Revolution in Recruitment</h3>
        <p>Traditional hiring processes often involved weeks of manual screening, countless interviews, and subjective decision-making that could overlook qualified candidates. Today's AI-powered platforms are changing this narrative by introducing sophisticated algorithms that can assess technical skills, cultural fit, and potential more accurately than ever before.</p>

        <p>Machine learning models now analyze code repositories, evaluate problem-solving approaches, and even assess communication patterns to provide comprehensive candidate profiles. This data-driven approach not only speeds up the hiring process but also reduces unconscious bias, creating more equitable opportunities for developers from diverse backgrounds.</p>

        <h3>Benefits for Remote Teams</h3>
        <p>For companies building remote teams, AI offers several distinct advantages:</p>
        
        <ul>
          <li><strong>Global Talent Pool Access:</strong> AI can process applications from anywhere in the world, breaking down geographical barriers that once limited hiring options.</li>
          <li><strong>24/7 Screening:</strong> Automated systems work around the clock, enabling continuous candidate evaluation across different time zones.</li>
          <li><strong>Skill-Based Matching:</strong> Advanced algorithms can match specific technical requirements with candidate capabilities more precisely than keyword-based searches.</li>
          <li><strong>Predictive Analytics:</strong> AI can predict candidate success rates and long-term retention based on historical data and behavioral patterns.</li>
        </ul>

        <h3>The Developer Perspective</h3>
        <p>From a developer's standpoint, AI-driven hiring platforms offer a more streamlined and fair application process. Instead of submitting countless applications into the void, developers can showcase their skills through practical demonstrations, code challenges, and portfolio analysis that AI systems can quickly and accurately evaluate.</p>

        <p>This shift toward skill-based assessment means that talented developers who might not have traditional credentials or extensive networks can still find excellent remote opportunities. The focus moves from where you went to school or who you know to what you can actually build and contribute.</p>

        <h3>Looking Ahead</h3>
        <p>As AI technology continues to advance, we can expect even more sophisticated matching algorithms, real-time skill assessment tools, and predictive models that can identify high-potential candidates before they even start looking for new opportunities.</p>

        <p>The future of remote tech hiring isn't just about finding qualified candidates—it's about creating perfect matches between companies and developers that lead to long-term success and satisfaction for everyone involved.</p>

        <p>Companies that embrace these AI-powered tools today will have a significant advantage in building world-class remote teams, while developers who understand how to present their skills in this new landscape will find themselves with more opportunities than ever before.</p>
      `,
      author: "Sarah Mitchell",
      date: "June 8, 2025",
      readTime: "5 min read",
      category: "AI & Hiring",
      image: "/blog1.jpg",
      gradient: "from-blue-500/20 to-cyan-500/10",
    },
    2: {
      title: "Building High-Performance Remote Development Teams",
      content: `
        <p>Creating and managing high-performance remote development teams requires a strategic approach that goes beyond simply hiring talented developers. It's about fostering collaboration, maintaining productivity, and building a culture that thrives in a distributed environment.</p>

        <h3>Foundation of Success</h3>
        <p>The foundation of any successful remote development team lies in clear communication protocols, well-defined processes, and the right technological infrastructure. Teams that excel in remote environments have mastered the art of asynchronous communication while maintaining the human connections that drive innovation.</p>

        <p>Establishing clear expectations from day one is crucial. This includes defining work hours overlap, communication channels for different types of discussions, and decision-making processes that don't rely on everyone being online simultaneously.</p>

        <h3>Tools and Technologies</h3>
        <p>The right tool stack can make or break a remote team's effectiveness. Beyond the obvious choices like Slack and Zoom, high-performing teams leverage:</p>

        <ul>
          <li><strong>Collaborative Development Environments:</strong> Tools like GitHub Codespaces or GitPod that allow seamless code sharing and pair programming.</li>
          <li><strong>Project Management Platforms:</strong> Comprehensive solutions like Linear or Notion that provide visibility into progress and priorities.</li>
          <li><strong>Async Communication Tools:</strong> Loom for video explanations, Figma for design collaboration, and structured documentation systems.</li>
        </ul>

        <h3>Building Team Culture Remotely</h3>
        <p>Culture isn't just what happens in an office—it's the shared values, practices, and interactions that define how a team operates. Remote teams that build strong cultures do so intentionally through regular virtual coffee chats, collaborative problem-solving sessions, and shared learning experiences.</p>

        <p>Recognition and celebration become even more important in remote settings. Acknowledging achievements publicly in team channels, hosting virtual team events, and creating opportunities for informal interactions help maintain morale and connection.</p>
      `,
      author: "Michael Rodriguez",
      date: "June 5, 2025",
      readTime: "7 min read",
      category: "Team Management",
      image: "/blog2.jpg",
      gradient: "from-purple-500/20 to-pink-500/10",
    },
    3: {
      title: "Web3 Development: Skills That Are in High Demand",
      content: `
        <p>The Web3 ecosystem continues to evolve rapidly, creating new opportunities for developers who understand blockchain technology, decentralized applications, and the principles of the decentralized web. As we progress through 2025, certain skills have emerged as particularly valuable in this space.</p>

        <h3>Core Technical Skills</h3>
        <p>Solidity remains the dominant language for Ethereum smart contract development, but the landscape is expanding. Rust is gaining significant traction for projects on Solana and other high-performance blockchains, while JavaScript frameworks adapted for Web3 are becoming essential for frontend development.</p>

        <p>Understanding blockchain fundamentals is non-negotiable. This includes concepts like consensus mechanisms, gas optimization, security best practices, and the ability to design systems that can handle the unique constraints of decentralized networks.</p>

        <h3>Emerging Technologies</h3>
        <p>Layer 2 solutions, cross-chain protocols, and zero-knowledge proofs represent the cutting edge of Web3 development. Developers who can navigate these complex systems and build applications that leverage their benefits are in extremely high demand.</p>

        <p>DeFi (Decentralized Finance) continues to be a major driver of innovation, requiring developers who understand financial primitives, liquidity mechanisms, and the security considerations unique to handling digital assets.</p>

        <h3>Beyond the Code</h3>
        <p>Web3 development isn't just about technical skills. Understanding tokenomics, governance mechanisms, and community-driven development processes is crucial for building applications that succeed in the decentralized ecosystem.</p>

        <p>The ability to think about user experience in the context of wallet interactions, transaction fees, and blockchain limitations separates good Web3 developers from great ones.</p>
      `,
      author: "Alex Chen",
      date: "June 2, 2025",
      readTime: "6 min read",
      category: "Web3 & Blockchain",
      image: "/blog3.jpg",
      gradient: "from-green-500/20 to-emerald-500/10",
    },
  };

  const blog = blogData[blogId] || blogData[1];

  const relatedPosts = [
    {
      id: 2,
      title: "Building High-Performance Remote Development Teams",
      category: "Team Management",
      readTime: "7 min read",
    },
    {
      id: 3,
      title: "Web3 Development: Skills That Are in High Demand",
      category: "Web3 & Blockchain",
      readTime: "6 min read",
    },
  ].filter((post) => post.id !== blogId);

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-indigo-900/20"></div>

      {/* Hero Section */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-12">
          {/* Back Button */}
          <button
            onClick={() => window.history.back()}
            className="group flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300 mb-8"
          >
            <FaArrowLeft className="text-sm group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Back to Articles</span>
          </button>

          {/* Article Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <span className="px-3 py-1 bg-blue-500/80 backdrop-blur-sm text-white text-sm font-medium rounded-full">
                {blog.category}
              </span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              {blog.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="flex items-center space-x-6 text-gray-400">
                <div className="flex items-center space-x-2">
                  <FaUser className="text-sm" />
                  <span>{blog.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaCalendarAlt className="text-sm" />
                  <span>{blog.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaClock className="text-sm" />
                  <span>{blog.readTime}</span>
                </div>
              </div>

              {/* Social Actions */}
              <div className="flex items-center space-x-3">
                <button className="p-2 rounded-full bg-white/5 border border-white/10 hover:border-white/20 text-gray-400 hover:text-red-400 transition-all duration-300">
                  <FaHeart className="text-sm" />
                </button>
                <button className="p-2 rounded-full bg-white/5 border border-white/10 hover:border-white/20 text-gray-400 hover:text-blue-400 transition-all duration-300">
                  <FaBookmark className="text-sm" />
                </button>
                <button className="p-2 rounded-full bg-white/5 border border-white/10 hover:border-white/20 text-gray-400 hover:text-green-400 transition-all duration-300">
                  <FaShare className="text-sm" />
                </button>
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative h-64 lg:h-80 bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl overflow-hidden mb-8">
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div
                className={`absolute inset-0 bg-gradient-to-br ${blog.gradient} opacity-30`}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <article className="prose prose-lg prose-invert max-w-none">
            {/* Main Content */}
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />

            {/* Social Share */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-white font-semibold mb-2">
                    Share this article
                  </h4>
                  <div className="flex items-center space-x-3">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300">
                      <FaLinkedin className="text-sm" />
                      <span className="text-sm">LinkedIn</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-300">
                      <FaTwitter className="text-sm" />
                      <span className="text-sm">Twitter</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-blue-800 hover:bg-blue-900 text-white rounded-lg transition-colors duration-300">
                      <FaFacebook className="text-sm" />
                      <span className="text-sm">Facebook</span>
                    </button>
                  </div>
                </div>

                {/* Author Info */}
                <div className="flex items-center space-x-3 p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <FaUser className="text-white text-sm" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{blog.author}</p>
                    <p className="text-gray-400 text-sm">Senior Tech Writer</p>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <div className="relative z-10 my-16">
          <div className="max-w-6xl mx-auto px-6">
            <h3 className="text-2xl font-bold text-white mb-8">
              Related Articles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((post) => (
                <div
                  key={post.id}
                  className="group p-6 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                >
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">
                      {post.category}
                    </span>
                    <span className="text-gray-400 text-xs">
                      {post.readTime}
                    </span>
                  </div>
                  <h4 className="text-white font-semibold group-hover:text-blue-300 transition-colors duration-300">
                    {post.title}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Ambient background effects */}
      <div className="absolute top-40 left-10 w-32 h-32 bg-blue-500/8 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-40 right-10 w-40 h-40 bg-purple-500/8 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-indigo-500/5 rounded-full blur-3xl"></div>
    </div>
  );
}
