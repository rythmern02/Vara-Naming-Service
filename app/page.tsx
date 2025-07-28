"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ArrowRight,
  Shield,
  Zap,
  Users,
  Globe,
  CheckCircle,
  Star,
  Code,
  Gamepad2,
  TrendingUp,
  Network,
  Coins,
  Award,
  Sparkles,
  Rocket,
  Target,
  BarChart3,
  Smartphone,
  Cloud,
  Database,
  Play,
  Pause,
  Volume2,
  VolumeX,
} from "lucide-react"
import Image from "next/image"

export default function VNSLandingPage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const [activeFeature, setActiveFeature] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const heroRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Particle animation
  useEffect(() => {
    const canvas = particlesRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
    }> = []

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, index) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 212, 170, ${particle.opacity})`
        ctx.fill()

        // Connect nearby particles
        particles.forEach((otherParticle, otherIndex) => {
          if (index !== otherIndex) {
            const dx = particle.x - otherParticle.x
            const dy = particle.y - otherParticle.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 100) {
              ctx.beginPath()
              ctx.moveTo(particle.x, particle.y)
              ctx.lineTo(otherParticle.x, otherParticle.y)
              ctx.strokeStyle = `rgba(0, 212, 170, ${0.1 * (1 - distance / 100)})`
              ctx.stroke()
            }
          }
        })
      })

      if (isPlaying) {
        requestAnimationFrame(animate)
      }
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [isPlaying])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    formData.append("access_key","940a31fc-6165-4983-a4ab-0ab2ba122286"); // Replace with your actual key

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    });
    const result = await response.json();
    if (result.success) {
      setIsSubmitted(true);
      setIsLoading(false);
    } else {
      // handle error
      setIsLoading(false);
    }
  }

  const coreFeatures = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: `Readable Domains`,
      description: "Transform 5GrwvaEF.... into alice.vara",
      details:
      `No more copying and pasting long cryptographic addresses. VNS domains are memorable, shareable, and eliminate the risk of sending funds to wrong addresses.
         `,
      color: "from-cyan-400 to-blue-500",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Comprehensive Identity Infrastructure",
      description: "Complete digital profiles with social verification and professional credentials",
      details:
        "Link your Twitter, Discord, GitHub, LinkedIn accounts with cryptographic proof. Build a verified professional network that follows you across platforms.",
      color: "from-green-400 to-emerald-500",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Performance",
      description: "100x cheaper operations with WebAssembly-powered instant resolution",
      details:
        "Built on Vara Network's asynchronous architecture. Complex operations that cost $50+ on Ethereum cost pennies on VNS.",
      color: "from-yellow-400 to-orange-500",
    },
    {
      icon: <Network className="w-8 h-8" />,
      title: "On-Chain Access Control",
      description: "Domain owners can set granular permissions on who can update, resolve, or view specific records, all enforced by smart contracts",
      details:
        "One domain, multiple addresses. Set your Bitcoin, Ethereum, Polkadot, and Vara addresses all under one memorable name.",
      color: "from-purple-400 to-pink-500",
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Decentralized Content Hosting",
      description: "Host websites and applications directly from your domain using IPFS and Arweave",
      details:
        "Turn your domain into a censorship-resistant website. Update content through simple record changes with automatic versioning.",
      color: "from-indigo-400 to-purple-500",
    },
    {
      icon: <Coins className="w-8 h-8" />,
      title: "DeFi Integration",
      description: "Accept payments, stake tokens, and interact with protocols directly through your domain",
      details:
        "Configure automatic yield farming, donation routing, and multi-currency payments. Your domain becomes your DeFi hub.",
      color: "from-emerald-400 to-teal-500",
    },
  ]

  const advancedFeatures = [
    {
      icon: <Gamepad2 className="w-6 h-6" />,
      title: "Gaming & Metaverse Identity",
      description: "Portable gaming profiles with achievements and virtual asset management",
      stats: "Cross-platform compatibility",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Professional Networking",
      description: "Verified credentials, endorsements, and career information",
      stats: "Cryptographic verification",
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Developer SDKs",
      description: "JavaScript, Python, Rust, and Go libraries with comprehensive docs",
      stats: "Multi-language support",
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Mobile Applications",
      description: "Native iOS and Android apps for domain management",
      stats: "Native performance",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Analytics Dashboard",
      description: "Track domain usage, resolution statistics, and performance metrics",
      stats: "Real-time insights",
    },
    {
      icon: <Cloud className="w-6 h-6" />,
      title: "API Infrastructure",
      description: "RESTful APIs and GraphQL endpoints for seamless integration",
      stats: "99.9% uptime SLA",
    },
  ]

  const tokenomics = [
    { label: "Community Treasury", percentage: 30, amount: "300M VNS$", color: "#00D4AA" },
    { label: "Ecosystem Development", percentage: 25, amount: "250M VNS$", color: "#00B894" },
    { label: "Team & Advisors", percentage: 15, amount: "150M VNS$", color: "#00A085" },
    { label: "Public Sale", percentage: 15, amount: "150M VNS$", color: "#008876" },
    { label: "Private Sale", percentage: 10, amount: "100M VNS$", color: "#007067" },
    { label: "Liquidity & MM", percentage: 5, amount: "50M VNS$", color: "#005858" },
  ]

  const stats = [
    { number: "1B", label: "Total Token Supply", icon: <Coins className="w-6 h-6" /> },
    { number: "100x", label: "Cheaper Operations", icon: <Zap className="w-6 h-6" /> },
    { number: "∞", label: "Possibilities", icon: <Sparkles className="w-6 h-6" /> },
  ]

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Animated Particle Background */}
      <canvas ref={particlesRef} className="fixed inset-0 pointer-events-none z-0" style={{ opacity: 0.3 }} />

      {/* Dynamic Background Effects */}
      <div className="fixed inset-0 z-0">
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-[#00D4AA] to-cyan-400 rounded-full blur-3xl opacity-20 animate-pulse"
          style={{
            left: `${mousePosition.x / 10}px`,
            top: `${mousePosition.y / 10}px`,
            transform: `translate(-50%, -50%) scale(${1 + Math.sin(scrollY / 100) * 0.1})`,
          }}
        />
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl opacity-10 animate-pulse"
          style={{
            right: `${mousePosition.x / 15}px`,
            bottom: `${mousePosition.y / 15}px`,
            transform: `translate(50%, 50%) scale(${1 + Math.cos(scrollY / 150) * 0.1})`,
            animationDelay: "1s",
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between p-6 lg:px-12 backdrop-blur-md bg-black/20 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Image src="/vns-logo.png" alt="VNS Logo" width={40} height={40} className="w-10 h-10 animate-pulse" />
            <div className="absolute inset-0 bg-[#00D4AA] rounded-full blur-md opacity-50 animate-ping" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-white to-[#00D4AA] bg-clip-text text-transparent">
            VNS
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsPlaying(!isPlaying)}
            className="text-white/60 hover:text-white"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMuted(!isMuted)}
            className="text-white/60 hover:text-white"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </Button>
          <Badge className="bg-gradient-to-r from-[#00D4AA] to-cyan-400 text-white font-semibold animate-pulse">
            🚀 Coming Soon
          </Badge>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative z-10 px-6 lg:px-12 pt-12 pb-24 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <Badge className="bg-gradient-to-r from-[#00D4AA]/20 to-cyan-400/20 text-[#00D4AA] border-[#00D4AA]/30 animate-bounce">
                  🌟 Revolutionizing Digital Identity on Vara Network
                </Badge>
                <h1 className="text-6xl lg:text-8xl font-black leading-tight">
                  <span className="bg-gradient-to-r from-white via-[#00D4AA] to-cyan-400 bg-clip-text text-transparent animate-pulse">
                    Your Identity,
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-[#00D4AA] to-emerald-400 bg-clip-text text-transparent">
                    Simplified
                  </span>
                </h1>
                <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-2xl">
                  Transform cryptographic addresses into human-readable names. VNS brings comprehensive digital identity
                  infrastructure to the Vara Network ecosystem with{" "}
                  <span className="text-[#00D4AA] font-semibold">100x cheaper operations</span> and{" "}
                  <span className="text-[#00D4AA] font-semibold">instant resolution</span>.
                </p>
              </div>

              {/* Enhanced Waitlist Form */}
              <div className="space-y-6">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE" />
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1 relative group">
                        <Input
                          type="email"
                          name="email"
                          placeholder="Enter your email to join the revolution"
                          value={email}
                          onChange={(e: any) => setEmail(e.target.value)}
                          className="h-14 bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-[#00D4AA] focus:ring-[#00D4AA] focus:ring-2 transition-all duration-300 group-hover:border-[#00D4AA]/50"
                          required
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#00D4AA]/10 to-cyan-400/10 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      </div>
                      <Button
                        type="submit"
                        disabled={isLoading}
                        size="lg"
                        className="h-14 px-8 bg-gradient-to-r from-[#00D4AA] to-cyan-400 hover:from-[#00D4AA]/80 hover:to-cyan-400/80 text-white font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[#00D4AA]/25"
                      >
                        {isLoading ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                            <span>Joining...</span>
                          </div>
                        ) : (
                          <>
                            Join Waitlist
                            <ArrowRight className="ml-2 w-5 h-5" />
                          </>
                        )}
                      </Button>
                    </div>
                    <p className="text-sm text-gray-400 flex items-center space-x-2">
                      <Shield className="w-4 h-4" />
                      <span>We respect your privacy. No spam, ever.</span>
                    </p>
                  </form>
                ) : (
                  <div className="flex items-center justify-center space-x-3 p-6 bg-gradient-to-r from-[#00D4AA]/10 to-emerald-400/10 rounded-xl border border-[#00D4AA]/30">
                    <CheckCircle className="w-8 h-8 text-[#00D4AA]" />
                    <div>
                      <span className="text-xl font-bold text-[#00D4AA]">Welcome to the future! 🎉</span>
                      <p className="text-gray-300">You'll be among the first to experience VNS.</p>
                    </div>
                  </div>
                )}

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className="text-center p-4 bg-white/5 rounded-xl border border-white/10 hover:border-[#00D4AA]/50 transition-all duration-300 group"
                    >
                      <div className="text-[#00D4AA] mb-2 group-hover:scale-110 transition-transform">{stat.icon}</div>
                      <div className="text-2xl lg:text-3xl font-bold text-[#00D4AA] mb-1">{stat.number}</div>
                      <div className="text-gray-400 text-sm">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Interactive Demo */}
            <div className="relative">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-4">See VNS in Action</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                        <p className="text-sm text-gray-400 mb-2">Traditional Address:</p>
                        <code className="text-red-400 text-xs break-all">
                          5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY
                        </code>
                      </div>
                      <div className="flex items-center justify-center">
                        <ArrowRight className="w-6 h-6 text-[#00D4AA] animate-pulse" />
                      </div>
                      <div className="p-4 bg-[#00D4AA]/10 border border-[#00D4AA]/20 rounded-xl">
                        <p className="text-sm text-gray-400 mb-2">VNS Domain:</p>
                        <code className="text-[#00D4AA] text-lg font-bold">alice.vara</code>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-[#00D4AA]/20 to-cyan-400/20 rounded-3xl blur-xl opacity-50 animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="relative z-10 px-6 lg:px-12 py-24 bg-gradient-to-b from-transparent via-white/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-gradient-to-r from-[#00D4AA]/20 to-cyan-400/20 text-[#00D4AA] border-[#00D4AA]/30 mb-6">
              🔥 Core Features
            </Badge>
            <h2 className="text-5xl lg:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-white to-[#00D4AA] bg-clip-text text-transparent">Why Choose</span>{" "}
              <span className="text-[#00D4AA]">VNS</span>?
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Built on Vara Network's cutting-edge technology, VNS offers unparalleled performance, security, and user
              experience that makes other naming services look primitive.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {coreFeatures.map((feature, index) => (
              <Card
                key={index}
                className="group bg-gradient-to-br from-white/10 to-white/5 border-white/20 hover:border-[#00D4AA]/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-[#00D4AA]/10 overflow-hidden "
                onMouseEnter={() => setActiveFeature(index)}
              >
                <CardContent className="p-8 relative">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 text-wrap`}
                  />
                  <div className="relative z-10">
                    <div className="flex items-start space-x-6">
                      <div
                        className={`p-4 bg-gradient-to-br ${feature.color} rounded-2xl text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        {feature.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-[#00D4AA] transition-colors text-wrap">
                          {feature.title}
                        </h3>
                        <p className="text-gray-300 mb-4 leading-relaxed text-wrap">{feature.description}</p>
                        <p className="text-sm text-gray-400 leading-relaxed">{feature.details}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Features Grid */}
      <section className="relative z-10 px-6 lg:px-12 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black mb-6">
              <span className="bg-gradient-to-r from-[#00D4AA] to-cyan-400 bg-clip-text text-transparent">
                Advanced Capabilities
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover the full spectrum of features that make VNS the most comprehensive identity platform in Web3.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advancedFeatures.map((feature, index) => (
              <div
                key={index}
                className="group p-6 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/10 hover:border-[#00D4AA]/50 transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-[#00D4AA]/10 rounded-xl text-[#00D4AA] group-hover:bg-[#00D4AA]/20 transition-colors">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{feature.title}</h3>
                    <p className="text-sm text-[#00D4AA]">{feature.stats}</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tokenomics Section */}
      <section className="relative z-10 px-6 lg:px-12 py-24 bg-gradient-to-b from-white/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-gradient-to-r from-[#00D4AA]/20 to-cyan-400/20 text-[#00D4AA] border-[#00D4AA]/30 mb-6">
              💰 Tokenomics
            </Badge>
            <h2 className="text-5xl lg:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-white to-[#00D4AA] bg-clip-text text-transparent">VNS$ Token</span>{" "}
              <span className="text-[#00D4AA]">Distribution</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              1 billion VNS$ tokens designed for sustainable growth, community ownership, and long-term value creation.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {tokenomics.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-[#00D4AA]/30 transition-all duration-300"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
                    <div>
                      <h3 className="font-bold text-lg">{item.label}</h3>
                      <p className="text-gray-400">{item.amount}</p>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-[#00D4AA]">{item.percentage}%</div>
                </div>
              ))}
            </div>

            <div className="space-y-8">
              <div className="p-8 bg-gradient-to-br from-[#00D4AA]/10 to-cyan-400/10 rounded-3xl border border-[#00D4AA]/20">
                <h3 className="text-2xl font-bold mb-6 text-center">Token Utility</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-[#00D4AA]" />
                    <span>Governance participation and voting</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Zap className="w-5 h-5 text-[#00D4AA]" />
                    <span>Up to 50% discount on domain fees</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="w-5 h-5 text-[#00D4AA]" />
                    <span>8-15% annual staking rewards</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Star className="w-5 h-5 text-[#00D4AA]" />
                    <span>Premium features and priority support</span>
                  </div>
                </div>
              </div>

              <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/10">
                <div className="text-4xl font-black text-[#00D4AA] mb-2">1,000,000,000</div>
                <div className="text-gray-400">Total VNS$ Supply</div>
                <div className="text-sm text-gray-500 mt-2">Fixed supply • No inflation</div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Security & Governance */}
      <section className="relative z-10 px-6 lg:px-12 py-24 bg-gradient-to-b from-white/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <Badge className="bg-gradient-to-r from-red-500/20 to-orange-500/20 text-red-400 border-red-500/30 mb-6">
                  🛡️ Security First
                </Badge>
                <h2 className="text-4xl font-black mb-6">
                  <span className="bg-gradient-to-r from-white to-red-400 bg-clip-text text-transparent">
                    Military-Grade
                  </span>{" "}
                  <span className="text-red-400">Security</span>
                </h2>
                <p className="text-xl text-gray-300 leading-relaxed mb-8">
                  Multi-layered security architecture with formal verification, smart contract audits, and continuous
                  monitoring.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  "Multiple independent security audits",
                  "Formal verification of critical contracts",
                  "Multi-signature protection for high-value domains",
                  "Time-locked transfers with emergency procedures",
                  "Continuous monitoring and threat detection",
                  "Bug bounty program with substantial rewards",
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-red-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <Badge className="bg-gradient-to-r from-[#00D4AA]/20 to-cyan-400/20 text-[#00D4AA] border-[#00D4AA]/30 mb-6">
                  🏛️ Governance
                </Badge>
                <h2 className="text-4xl font-black mb-6">
                  <span className="bg-gradient-to-r from-white to-[#00D4AA] bg-clip-text text-transparent">
                    Community
                  </span>{" "}
                  <span className="text-[#00D4AA]">Owned</span>
                </h2>
                <p className="text-xl text-gray-300 leading-relaxed mb-8">
                  True decentralization with community governance, transparent decision-making, and democratic protocol
                  evolution.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  "Token-weighted voting with quadratic mechanisms",
                  "Community treasury controlled by holders",
                  "Proposal submission with 10,000 VNS$ minimum",
                  "Vote delegation to trusted community members",
                  "Transparent on-chain governance execution",
                  "Regular community calls and feedback sessions",
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-[#00D4AA]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 px-6 lg:px-12 py-24 bg-gradient-to-t from-[#00D4AA]/10 via-transparent to-transparent">
        <div className="max-w-6xl mx-auto text-center">
          <div className="space-y-8">
            <Badge className="bg-gradient-to-r from-[#00D4AA] to-cyan-400 text-white font-bold text-lg px-6 py-2 animate-pulse">
              🚀 The Future is Now
            </Badge>
            <h2 className="text-5xl lg:text-7xl font-black leading-tight">
              <span className="bg-gradient-to-r from-white via-[#00D4AA] to-cyan-400 bg-clip-text text-transparent">
                Ready to Transform
              </span>
              <br />
              <span className="text-[#00D4AA]">Your Digital Identity?</span>
            </h2>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Join thousands of visionaries, developers, and innovators building the future of decentralized identity.
              Be among the first to experience the power of VNS.
            </p>

            {!isSubmitted && (
              <div className="space-y-6">
                <Button
                  size="lg"
                  className="h-16 px-12 bg-gradient-to-r from-[#00D4AA] to-cyan-400 hover:from-[#00D4AA]/80 hover:to-cyan-400/80 text-white font-black text-xl transition-all duration-300 transform hover:scale-110 shadow-2xl hover:shadow-[#00D4AA]/25"
                  onClick={() => document.querySelector(('input[type="email"]') as HTMLInputElement | any)?.focus()}
                >
                  <Rocket className="mr-3 w-6 h-6" />
                  Join the Revolution
                  <Sparkles className="ml-3 w-6 h-6" />
                </Button>
                <p className="text-gray-400 flex items-center justify-center space-x-2">
                  <Target className="w-4 h-4" />
                  <span>Limited early access • Exclusive benefits • No spam</span>
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
              {[
                { icon: <Globe className="w-8 h-8" />, label: "Global Reach" },
                { icon: <Zap className="w-8 h-8" />, label: "Lightning Fast" },
                { icon: <Shield className="w-8 h-8" />, label: "Ultra Secure" },
                { icon: <Users className="w-8 h-8" />, label: "Community Driven" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center space-y-3 p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-[#00D4AA]/50 transition-all duration-300 group"
                >
                  <div className="text-[#00D4AA] group-hover:scale-110 transition-transform">{item.icon}</div>
                  <span className="font-semibold">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 px-6 lg:px-12 py-16 bg-gradient-to-b from-transparent to-black/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center space-x-3">
                <Image src="/vns-logo.png" alt="VNS Logo" width={40} height={40} className="w-10 h-10" />
                <span className="text-2xl font-bold bg-gradient-to-r from-white to-[#00D4AA] bg-clip-text text-transparent">
                  Vara Naming Service
                </span>
              </div>
              <p className="text-gray-300 leading-relaxed max-w-md">
                Building the future of digital identity on Vara Network. Transform your blockchain experience with
                human-readable domains and comprehensive identity infrastructure.
              </p>
              <div className="flex items-center space-x-4">
                <Badge className="bg-[#00D4AA]/10 text-[#00D4AA] border-[#00D4AA]/20">Built on Vara Network</Badge>
                <Badge className="bg-white/10 text-white border-white/20">Community Owned</Badge>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#00D4AA]">Features</h3>
              <div className="space-y-2 text-gray-300">
                <p>Human-readable domains</p>
                <p>Social verification</p>
                <p>DeFi integration</p>
                <p>Cross-platform support</p>
                <p>Developer tools</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#00D4AA]">Community</h3>
              <div className="space-y-2 text-gray-300">
                <p>Discord server</p>
                <p>Twitter updates</p>
                <p>GitHub repository</p>
                <p>Developer docs</p>
                <p>Bug bounty program</p>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between">
            <div className="text-gray-400 text-center md:text-left mb-4 md:mb-0">
              <p className="text-sm mt-1">Building the decentralized future, one domain at a time.</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">On top of</span>
              <Badge className="bg-gradient-to-r from-[#00D4AA] to-cyan-400 text-white font-semibold">
                Vara Network
              </Badge>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
