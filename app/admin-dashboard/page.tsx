"use client";

import { toast, ToastContainer } from "react-toastify";
import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaProjectDiagram,
  FaDollarSign,
  FaCalendarAlt,
  FaFlag,
  FaEnvelope,
  FaPhone,
  FaBuilding,
  FaEye,
  FaEdit,
  FaTrash,
  FaSearch,
  FaFilter,
  FaSortAmountDown,
  FaSortAmountUp,
  FaChevronDown,
  FaChevronRight,
  FaTimes,
  FaCheck,
  FaClock,
  FaExclamationTriangle,
  FaFileAlt,
} from "react-icons/fa";

interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  role: string;
}

interface ProjectDetails {
  title: string;
  description: string;
  category: string;
  timeline: string;
  urgency: string;
  techStack: string[];
  requirements: string;
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  budget: string;
  timeline: string;
}

interface PricingOption {
  type: "fixed" | "milestone" | "hourly";
  currency: "USD" | "KES";
  fixedBudget?: string;
  milestones?: Milestone[];
  hourlyRate?: string;
  estimatedHours?: string;
}

interface ProjectData {
  _id: string;
  userInfo: UserInfo;
  projectDetails: ProjectDetails;
  pricing: PricingOption;
  status: "pending" | "reviewed" | "approved" | "rejected";
  submittedAt: string;
  priority: "low" | "medium" | "high" | "critical";
}

// Mock data for demonstration
const mockProjects: ProjectData[] = [
  {
    _id: "1",
    userInfo: {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "+254 712 345 678",
      company: "Tech Innovations Ltd",
      role: "CEO/Founder",
    },
    projectDetails: {
      title: "E-commerce Mobile App",
      description:
        "A comprehensive e-commerce mobile application with payment integration, user authentication, and real-time inventory management.",
      category: "Mobile Application",
      timeline: "3-6 months",
      urgency: "High - ASAP",
      techStack: [
        "React Native",
        "Node.js/Express",
        "Payment Gateway Integration",
        "API Development",
      ],
      requirements:
        "Must support both iOS and Android, integrate with existing inventory system",
    },
    pricing: {
      type: "milestone",
      currency: "USD",
      milestones: [
        {
          id: "m1",
          title: "UI/UX Design & Wireframes",
          description: "Complete app design and user flow",
          budget: "5000",
          timeline: "2 weeks",
        },
        {
          id: "m2",
          title: "Backend API Development",
          description: "RESTful API with authentication",
          budget: "8000",
          timeline: "4 weeks",
        },
      ],
    },
    status: "pending",
    submittedAt: "2024-06-10T10:30:00Z",
    priority: "high",
  },
  {
    _id: "2",
    userInfo: {
      firstName: "Sarah",
      lastName: "Johnson",
      email: "sarah.johnson@biztech.com",
      phone: "+254 722 987 654",
      company: "BizTech Solutions",
      role: "Product Manager",
    },
    projectDetails: {
      title: "SaaS Dashboard Platform",
      description:
        "A comprehensive dashboard for business analytics with real-time data visualization, user management, and reporting features.",
      category: "SaaS Platform",
      timeline: "6+ months",
      urgency: "Medium - Standard timeline",
      techStack: [
        "React/Next.js",
        "Node.js/Express",
        "Data Analytics",
        "UI/UX Design",
      ],
      requirements:
        "Multi-tenant architecture, real-time updates, custom branding options",
    },
    pricing: {
      type: "fixed",
      currency: "USD",
      fixedBudget: "25000",
    },
    status: "reviewed",
    submittedAt: "2024-06-09T14:15:00Z",
    priority: "medium",
  },
  {
    _id: "3",
    userInfo: {
      firstName: "Michael",
      lastName: "Chen",
      email: "m.chen@startupx.io",
      phone: "+254 733 456 789",
      company: "StartupX",
      role: "CTO",
    },
    projectDetails: {
      title: "AI-Powered Content Generator",
      description:
        "An AI-powered platform for generating marketing content, blog posts, and social media content with custom brand voice training.",
      category: "AI/ML Solution",
      timeline: "3-6 months",
      urgency: "Critical - Emergency",
      techStack: [
        "AI/Machine Learning",
        "Python/Django",
        "API Development",
        "React/Next.js",
      ],
      requirements:
        "Custom AI model training, API rate limiting, user subscription management",
    },
    pricing: {
      type: "hourly",
      currency: "USD",
      hourlyRate: "85",
      estimatedHours: "40",
    },
    status: "approved",
    submittedAt: "2024-06-08T09:45:00Z",
    priority: "critical",
  },
  {
    _id: "4",
    userInfo: {
      firstName: "Emily",
      lastName: "Rodriguez",
      email: "emily.r@healthtech.com",
      phone: "+254 744 123 456",
      company: "HealthTech Innovations",
      role: "Project Manager",
    },
    projectDetails: {
      title: "Telemedicine Platform",
      description:
        "A secure telemedicine platform with video consultations, patient records management, and prescription handling.",
      category: "Healthcare Solution",
      timeline: "6+ months",
      urgency: "High - ASAP",
      techStack: [
        "React/Next.js",
        "Node.js/Express",
        "Security Implementation",
        "Third-party Integrations",
      ],
      requirements:
        "HIPAA compliance, end-to-end encryption, integration with existing EMR systems",
    },
    pricing: {
      type: "milestone",
      currency: "USD",
      milestones: [
        {
          id: "m1",
          title: "Security & Compliance Setup",
          description: "HIPAA compliance and security implementation",
          budget: "12000",
          timeline: "3 weeks",
        },
      ],
    },
    status: "pending",
    submittedAt: "2024-06-07T16:20:00Z",
    priority: "high",
  },
];

export default function AdminDashboard() {
  const [projects, setProjects] = useState<ProjectData[]>(mockProjects);
  const [filteredProjects, setFilteredProjects] =
    useState<ProjectData[]>(mockProjects);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"date" | "priority" | "budget">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [showFilters, setShowFilters] = useState(false);

  // Status update functions
  const updateProjectStatus = (
    projectId: string,
    newStatus: "pending" | "reviewed" | "approved" | "rejected"
  ) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project._id === projectId ? { ...project, status: newStatus } : project
      )
    );

    // Close modal
    setSelectedProject(null);

    // Show success toast
    const statusMessages = {
      approved: "Project approved successfully! 🎉",
      reviewed: "Project marked as reviewed 👍",
      rejected: "Project rejected ❌",
      pending: "Project status updated ⏳",
    };

    toast.success(statusMessages[newStatus]);
  };

  // Individual button functions
  const handleApproveProject = () => {
    if (selectedProject) {
      updateProjectStatus(selectedProject._id, "approved");
    }
  };

  const handleMarkAsReviewed = () => {
    if (selectedProject) {
      updateProjectStatus(selectedProject._id, "reviewed");
    }
  };

  const handleRejectProject = () => {
    if (selectedProject) {
      // Simple confirmation using window.confirm
      const confirmed = window.confirm(
        "Are you sure you want to reject this project?"
      );
      if (confirmed) {
        updateProjectStatus(selectedProject._id, "rejected");
      }
    }
  };

  const handleContactClient = () => {
    if (selectedProject) {
      // Create mailto link
      const subject = encodeURIComponent(
        `Regarding: ${selectedProject.projectDetails.title}`
      );
      const body = encodeURIComponent(
        `Dear ${selectedProject.userInfo.firstName} ${selectedProject.userInfo.lastName},\n\nI hope this email finds you well. I am writing to discuss your project "${selectedProject.projectDetails.title}".\n\nBest regards,\nYour Development Team`
      );

      const mailtoLink = `mailto:${selectedProject.userInfo.email}?subject=${subject}&body=${body}`;
      window.open(mailtoLink);

      toast.success("Email client opened successfully! 📧");
    }
  };

  const handleGenerateQuote = () => {
    if (selectedProject) {
      // Generate quote data
      const quoteData = {
        projectTitle: selectedProject.projectDetails.title,
        clientName: `${selectedProject.userInfo.firstName} ${selectedProject.userInfo.lastName}`,
        company: selectedProject.userInfo.company,
        pricing: selectedProject.pricing,
        techStack: selectedProject.projectDetails.techStack,
        timeline: selectedProject.projectDetails.timeline,
        generatedDate: new Date().toLocaleDateString(),
      };

      // For demo purposes, we'll just show a success message
      // In a real app, you'd generate a PDF or navigate to a quote generation page
      console.log("Quote Data:", quoteData);
      toast.success("Quote generated successfully! 📄");

      // Optional: Download as JSON for now (you can replace with PDF generation)
      const dataStr = JSON.stringify(quoteData, null, 2);
      const dataBlob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `quote-${selectedProject.projectDetails.title
        .replace(/\s+/g, "-")
        .toLowerCase()}.json`;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  // Card action functions (for the small buttons in project cards)
  const handleViewProject = (project: ProjectData) => {
    setSelectedProject(project);
    toast.info("Opening project details...");
  };

  const handleEditProject = (project: ProjectData) => {
    // For demo purposes, just show that edit was clicked
    toast.info(
      `Edit mode for "${project.projectDetails.title}" - Feature coming soon! ✏️`
    );
  };

  const handleDeleteProject = (project: ProjectData) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${project.projectDetails.title}"?`
    );
    if (confirmed) {
      setProjects((prevProjects) =>
        prevProjects.filter((p) => p._id !== project._id)
      );
      toast.success("Project deleted successfully! 🗑️");
    }
  };

  // Add this useEffect to prevent body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      // Prevent body scroll
      document.body.style.overflow = "hidden";
    } else {
      // Restore body scroll
      document.body.style.overflow = "unset";
    }

    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedProject]);

  // Filter and search logic
  useEffect(() => {
    let filtered = projects;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (project) =>
          project.userInfo.firstName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          project.userInfo.lastName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          project.userInfo.email
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          project.projectDetails.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          project.userInfo.company
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((project) => project.status === statusFilter);
    }

    // Priority filter
    if (priorityFilter !== "all") {
      filtered = filtered.filter(
        (project) => project.priority === priorityFilter
      );
    }

    // Sorting
    filtered.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "date":
          comparison =
            new Date(a.submittedAt).getTime() -
            new Date(b.submittedAt).getTime();
          break;
        case "priority":
          const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
          comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
          break;
        case "budget":
          const getBudget = (project: ProjectData) => {
            if (project.pricing.type === "fixed") {
              return parseFloat(project.pricing.fixedBudget || "0");
            } else if (project.pricing.type === "milestone") {
              return (
                project.pricing.milestones?.reduce(
                  (sum, m) => sum + parseFloat(m.budget || "0"),
                  0
                ) || 0
              );
            }
            return (
              parseFloat(project.pricing.hourlyRate || "0") *
              parseFloat(project.pricing.estimatedHours || "0")
            );
          };
          comparison = getBudget(a) - getBudget(b);
          break;
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });

    setFilteredProjects(filtered);
  }, [projects, searchTerm, statusFilter, priorityFilter, sortBy, sortOrder]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <FaClock className="text-yellow-400" />;
      case "reviewed":
        return <FaEye className="text-blue-400" />;
      case "approved":
        return <FaCheck className="text-green-400" />;
      case "rejected":
        return <FaTimes className="text-red-400" />;
      default:
        return <FaClock className="text-gray-400" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "text-red-400 bg-red-500/20 border-red-400/30";
      case "high":
        return "text-orange-400 bg-orange-500/20 border-orange-400/30";
      case "medium":
        return "text-yellow-400 bg-yellow-500/20 border-yellow-400/30";
      case "low":
        return "text-green-400 bg-green-500/20 border-green-400/30";
      default:
        return "text-gray-400 bg-gray-500/20 border-gray-400/30";
    }
  };

  const formatBudget = (project: ProjectData) => {
    const currency = project.pricing.currency;
    if (project.pricing.type === "fixed") {
      return `${currency} ${project.pricing.fixedBudget || "0"}`;
    } else if (project.pricing.type === "milestone") {
      const total =
        project.pricing.milestones?.reduce(
          (sum, m) => sum + parseFloat(m.budget || "0"),
          0
        ) || 0;
      return `${currency} ${total}`;
    } else {
      const total =
        parseFloat(project.pricing.hourlyRate || "0") *
        parseFloat(project.pricing.estimatedHours || "0");
      return `${currency} ${total} (${project.pricing.hourlyRate}/hr)`;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      <section className="min-h-screen py-8 relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-indigo-900/10"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/8 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500/8 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-medium text-white mb-4">
              Project <span className="text-purple-400">Dashboard</span>
            </h1>
            <p className="text-lg text-gray-300">
              Manage and review client project submissions
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[
              {
                label: "Total Projects",
                value: projects.length,
                color: "blue",
                icon: FaProjectDiagram,
              },
              {
                label: "Pending Review",
                value: projects.filter((p) => p.status === "pending").length,
                color: "yellow",
                icon: FaClock,
              },
              {
                label: "Approved",
                value: projects.filter((p) => p.status === "approved").length,
                color: "green",
                icon: FaCheck,
              },
              {
                label: "High Priority",
                value: projects.filter(
                  (p) => p.priority === "high" || p.priority === "critical"
                ).length,
                color: "red",
                icon: FaExclamationTriangle,
              },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                    <p className="text-2xl font-semibold text-white mt-1">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg bg-${stat.color}-500/20`}>
                    <stat.icon className={`text-${stat.color}-400 text-xl`} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Filters and Search */}
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              {/* Search */}
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search projects, clients, companies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
                  />
                </div>
              </div>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-gray-300 hover:text-white hover:border-white/20 transition-colors"
              >
                <FaFilter />
                <span>Filters</span>
                {showFilters ? <FaChevronDown /> : <FaChevronRight />}
              </button>
            </div>

            {/* Filter Options */}
            {showFilters && (
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Status Filter */}
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Status
                    </label>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-400 transition-colors"
                    >
                      <option value="all" className="bg-gray-800">
                        All Status
                      </option>
                      <option value="pending" className="bg-gray-800">
                        Pending
                      </option>
                      <option value="reviewed" className="bg-gray-800">
                        Reviewed
                      </option>
                      <option value="approved" className="bg-gray-800">
                        Approved
                      </option>
                      <option value="rejected" className="bg-gray-800">
                        Rejected
                      </option>
                    </select>
                  </div>

                  {/* Priority Filter */}
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Priority
                    </label>
                    <select
                      value={priorityFilter}
                      onChange={(e) => setPriorityFilter(e.target.value)}
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-400 transition-colors"
                    >
                      <option value="all" className="bg-gray-800">
                        All Priority
                      </option>
                      <option value="critical" className="bg-gray-800">
                        Critical
                      </option>
                      <option value="high" className="bg-gray-800">
                        High
                      </option>
                      <option value="medium" className="bg-gray-800">
                        Medium
                      </option>
                      <option value="low" className="bg-gray-800">
                        Low
                      </option>
                    </select>
                  </div>

                  {/* Sort By */}
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Sort By
                    </label>
                    <select
                      value={sortBy}
                      onChange={(e) =>
                        setSortBy(
                          e.target.value as "date" | "priority" | "budget"
                        )
                      }
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-400 transition-colors"
                    >
                      <option value="date" className="bg-gray-800">
                        Date Submitted
                      </option>
                      <option value="priority" className="bg-gray-800">
                        Priority
                      </option>
                      <option value="budget" className="bg-gray-800">
                        Budget
                      </option>
                    </select>
                  </div>

                  {/* Sort Order */}
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Order
                    </label>
                    <button
                      onClick={() =>
                        setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                      }
                      className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white hover:border-white/20 transition-colors"
                    >
                      {sortOrder === "asc" ? (
                        <FaSortAmountUp />
                      ) : (
                        <FaSortAmountDown />
                      )}
                      <span>
                        {sortOrder === "asc" ? "Ascending" : "Descending"}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
            {filteredProjects.map((project, index) => (
              <div
                key={project._id}
                className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all duration-300 cursor-pointer group"
                onClick={() => setSelectedProject(project)}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-blue-300 transition-colors">
                      {project.projectDetails.title}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {project.userInfo.firstName} {project.userInfo.lastName} •{" "}
                      {project.userInfo.company}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(project.status)}
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(
                        project.priority
                      )}`}
                    >
                      {project.priority.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Project Info */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm text-gray-300">
                    <FaProjectDiagram className="mr-2 text-blue-400" />
                    <span>{project.projectDetails.category}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <FaDollarSign className="mr-2 text-green-400" />
                    <span>
                      {formatBudget(project)} ({project.pricing.type})
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <FaCalendarAlt className="mr-2 text-purple-400" />
                    <span>{project.projectDetails.timeline}</span>
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {project.projectDetails.techStack
                      .slice(0, 3)
                      .map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    {project.projectDetails.techStack.length > 3 && (
                      <span className="px-2 py-1 bg-gray-500/20 text-gray-300 rounded text-xs">
                        +{project.projectDetails.techStack.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-xs text-gray-400">
                    {formatDate(project.submittedAt)}
                  </span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewProject(project);
                      }}
                      className="p-2 text-gray-400 hover:text-blue-400 transition-colors cursor-pointer"
                    >
                      <FaEye className="text-xs" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditProject(project);
                      }}
                      className="p-2 text-gray-400 hover:text-green-400 transition-colors cursor-pointer"
                    >
                      <FaEdit className="text-xs" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteProject(project);
                      }}
                      className="p-2 text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
                    >
                      <FaTrash className="text-xs" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <FaProjectDiagram className="mx-auto text-6xl text-gray-600 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                No projects found
              </h3>
              <p className="text-gray-400">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>

        {/* Project Detail Modal */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900/95 backdrop-blur-md border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
              {/* Modal Header - Fixed */}
              <div className="p-6 border-b border-white/10 flex-shrink-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold text-white mb-2">
                      {selectedProject.projectDetails.title}
                    </h2>
                    <div className="flex items-center space-x-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(
                          selectedProject.priority
                        )}`}
                      >
                        {selectedProject.priority.toUpperCase()} PRIORITY
                      </span>
                      <div className="flex items-center space-x-2 text-gray-300">
                        {getStatusIcon(selectedProject.status)}
                        <span className="capitalize">
                          {selectedProject.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <FaTimes className="text-xl" />
                  </button>
                </div>
              </div>

              {/* Modal Content - Scrollable */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-6">
                  {/* Client Information */}
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <FaUser className="mr-2 text-blue-400" />
                      Client Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Name:</span>
                        <span className="text-white ml-2">
                          {selectedProject.userInfo.firstName}{" "}
                          {selectedProject.userInfo.lastName}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-400">Role:</span>
                        <span className="text-white ml-2">
                          {selectedProject.userInfo.role}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-400">Email:</span>
                        <span className="text-white ml-2">
                          {selectedProject.userInfo.email}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-400">Phone:</span>
                        <span className="text-white ml-2">
                          {selectedProject.userInfo.phone}
                        </span>
                      </div>
                      <div className="md:col-span-2">
                        <span className="text-gray-400">Company:</span>
                        <span className="text-white ml-2">
                          {selectedProject.userInfo.company}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <FaProjectDiagram className="mr-2 text-blue-400" />
                      Project Details
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <span className="text-gray-400 block mb-1">
                          Description:
                        </span>
                        <p className="text-white">
                          {selectedProject.projectDetails.description}
                        </p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <span className="text-gray-400 block mb-1">
                            Category:
                          </span>
                          <span className="text-white">
                            {selectedProject.projectDetails.category}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-400 block mb-1">
                            Timeline:
                          </span>
                          <span className="text-white">
                            {selectedProject.projectDetails.timeline}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-400 block mb-1">
                            Urgency:
                          </span>
                          <span className="text-white">
                            {selectedProject.projectDetails.urgency}
                          </span>
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-400 block mb-2">
                          Tech Stack:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.projectDetails.techStack.map(
                            (tech) => (
                              <span
                                key={tech}
                                className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg text-sm"
                              >
                                {tech}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-400 block mb-1">
                          Requirements:
                        </span>
                        <p className="text-white">
                          {selectedProject.projectDetails.requirements}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Pricing Information */}
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <FaDollarSign className="mr-2 text-green-400" />
                      Pricing Information
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <span className="text-gray-400 block mb-1">
                          Pricing Type:
                        </span>
                        <span className="text-white capitalize">
                          {selectedProject.pricing.type} Project
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-400 block mb-1">
                          Currency:
                        </span>
                        <span className="text-white">
                          {selectedProject.pricing.currency}
                        </span>
                      </div>

                      {selectedProject.pricing.type === "fixed" && (
                        <div>
                          <span className="text-gray-400 block mb-1">
                            Fixed Budget:
                          </span>
                          <span className="text-white text-xl font-semibold">
                            {selectedProject.pricing.currency}{" "}
                            {selectedProject.pricing.fixedBudget}
                          </span>
                        </div>
                      )}

                      {selectedProject.pricing.type === "hourly" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <span className="text-gray-400 block mb-1">
                              Hourly Rate:
                            </span>
                            <span className="text-white">
                              {selectedProject.pricing.currency}{" "}
                              {selectedProject.pricing.hourlyRate}/hr
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-400 block mb-1">
                              Estimated Hours:
                            </span>
                            <span className="text-white">
                              {selectedProject.pricing.estimatedHours} hours
                            </span>
                          </div>
                          <div className="md:col-span-2">
                            <span className="text-gray-400 block mb-1">
                              Total Estimate:
                            </span>
                            <span className="text-white text-xl font-semibold">
                              {selectedProject.pricing.currency}{" "}
                              {(
                                parseFloat(
                                  selectedProject.pricing.hourlyRate || "0"
                                ) *
                                parseFloat(
                                  selectedProject.pricing.estimatedHours || "0"
                                )
                              ).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      )}

                      {selectedProject.pricing.type === "milestone" && (
                        <div>
                          <span className="text-gray-400 block mb-3">
                            Milestones:
                          </span>
                          <div className="space-y-3">
                            {selectedProject.pricing.milestones?.map(
                              (milestone) => (
                                <div
                                  key={milestone.id}
                                  className="bg-white/5 border border-white/10 rounded-lg p-4"
                                >
                                  <div className="flex items-start justify-between mb-2">
                                    <h4 className="text-white font-medium">
                                      {milestone.title}
                                    </h4>
                                    <span className="text-green-400 font-semibold">
                                      {selectedProject.pricing.currency}{" "}
                                      {milestone.budget}
                                    </span>
                                  </div>
                                  <p className="text-gray-300 text-sm mb-2">
                                    {milestone.description}
                                  </p>
                                  <div className="flex items-center text-xs text-gray-400">
                                    <FaClock className="mr-1" />
                                    {milestone.timeline}
                                  </div>
                                </div>
                              )
                            )}
                            <div className="pt-3 border-t border-white/10">
                              <div className="flex items-center justify-between">
                                <span className="text-gray-400">
                                  Total Budget:
                                </span>
                                <span className="text-white text-xl font-semibold">
                                  {selectedProject.pricing.currency}{" "}
                                  {selectedProject.pricing.milestones
                                    ?.reduce(
                                      (sum, m) =>
                                        sum + parseFloat(m.budget || "0"),
                                      0
                                    )
                                    .toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Submission Info */}
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <FaCalendarAlt className="mr-2 text-purple-400" />
                      Submission Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Submitted:</span>
                        <span className="text-white ml-2">
                          {formatDate(selectedProject.submittedAt)}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-400">Status:</span>
                        <span className="text-white ml-2 capitalize">
                          {selectedProject.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Actions - Fixed */}
              <div className="p-6 border-t border-white/10 flex-shrink-0">
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleApproveProject}
                    className="flex-1 px-6 py-3 bg-green-600/20 hover:bg-green-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center cursor-pointer"
                  >
                    <FaCheck className="mr-2" />
                    Approve Project
                  </button>
                  <button
                    onClick={handleMarkAsReviewed}
                    className="flex-1 px-6 py-3 bg-blue-600/20 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center cursor-pointer"
                  >
                    <FaEye className="mr-2" />
                    Mark as Reviewed
                  </button>
                  <button
                    onClick={handleRejectProject}
                    className="flex-1 px-6 py-3 bg-red-600/20 hover:bg-red-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center cursor-pointer"
                  >
                    <FaTimes className="mr-2" />
                    Reject Project
                  </button>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 mt-3">
                  <button
                    onClick={handleContactClient}
                    className="flex-1 px-6 py-3 bg-white/5 border border-white/10 hover:border-white/20 text-white rounded-lg font-medium transition-colors flex items-center justify-center cursor-pointer"
                  >
                    <FaEnvelope className="mr-2" />
                    Contact Client
                  </button>
                  <button
                    onClick={handleGenerateQuote}
                    className="flex-1 px-6 py-3 bg-white/5 border border-white/10 hover:border-white/20 text-white rounded-lg font-medium transition-colors flex items-center justify-center cursor-pointer"
                  >
                    <FaFileAlt className="mr-2" />
                    Generate Quote
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}
