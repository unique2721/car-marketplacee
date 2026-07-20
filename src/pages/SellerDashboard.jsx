import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Bell, CarFront, PencilLine, Plus, Send, ShieldOff, Sparkles, Star, Trash2, UserCircle2 } from "lucide-react";
import { mockListings, mockMessages } from "../Data/mockData";
import { persistMarketplaceListings } from "../Data/mockLisitngs";
import { useAuth } from "../context/AuthContext";

const sellerProfileSeed = {
  name: "Jane Smith",
  email: "jane@example.com",
  phone: "+251 911 234 567",
  location: "Addis Ababa",
  bio: "Trusted seller with a strong focus on quality vehicles and fast buyer communication.",
};

const initialListings = mockListings.filter((listing) => listing.sellerId === "2");
const initialMessages = mockMessages
  .filter((message) => message.receiverId === "2")
  .map((message) => ({
    ...message,
    senderName: "John Doe",
    blocked: false,
    replied: false,
    reply: "",
  }));
const initialNewCar = {
  make: "",
  model: "",
  year: new Date().getFullYear(),
  price: "",
  mileage: "",
  location: "",
  color: "",
  fuel: "",
  transmission: "",
  description: "",
  features: "",
  imageUrl: "",
};

const getStoredListings = () => {
  if (typeof window === "undefined") return initialListings;
  try {
    const stored = window.localStorage.getItem("seller-dashboard-listings");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (error) {
    console.error("Unable to load stored listings", error);
  }
  return initialListings;
};

const getStoredProfile = (user) => {
  if (typeof window === "undefined") {
    return {
      ...sellerProfileSeed,
      name: user?.name || sellerProfileSeed.name,
      email: user?.email || sellerProfileSeed.email,
    };
  }

  try {
    const stored = window.localStorage.getItem("seller-dashboard-profile");
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        ...sellerProfileSeed,
        ...parsed,
        name: parsed.name || user?.name || sellerProfileSeed.name,
        email: parsed.email || user?.email || sellerProfileSeed.email,
      };
    }
  } catch (error) {
    console.error("Unable to load stored profile", error);
  }

  return {
    ...sellerProfileSeed,
    name: user?.name || sellerProfileSeed.name,
    email: user?.email || sellerProfileSeed.email,
  };
};

export default function SellerDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [listings, setListings] = useState(getStoredListings);
  const [messages, setMessages] = useState(initialMessages);
  const [editingListing, setEditingListing] = useState(null);
  const [selectedMessageId, setSelectedMessageId] = useState(initialMessages[0]?.id || null);
  const [replyText, setReplyText] = useState("");
  const [profile, setProfile] = useState(() => getStoredProfile(user));
  const [notice, setNotice] = useState("Welcome back! Your listings are performing well.");
  const [showAddCarModal, setShowAddCarModal] = useState(false);
  const [newCar, setNewCar] = useState(initialNewCar);

  const selectedMessage = useMemo(
    () => messages.find((message) => message.id === selectedMessageId) || null,
    [messages, selectedMessageId]
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("seller-dashboard-listings", JSON.stringify(listings));
    }
  }, [listings]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("seller-dashboard-profile", JSON.stringify(profile));
    }
  }, [profile]);

  useEffect(() => {
    setProfile((prev) => ({
      ...prev,
      name: user?.name || prev.name,
      email: user?.email || prev.email,
    }));
  }, [user?.id, user?.name, user?.email]);

  const stats = useMemo(() => {
    const activeListings = listings.filter((item) => item.status === "active").length;
    const unreadMessages = messages.filter((item) => !item.read && !item.blocked).length;
    const blockedBuyers = messages.filter((item) => item.blocked).length;

    return {
      activeListings,
      unreadMessages,
      blockedBuyers,
      rating: 4.8,
    };
  }, [listings, messages]);

  const handleDeleteListing = (id) => {
    setListings((prev) => prev.filter((item) => item.id !== id));
    setNotice("Listing removed from your dashboard.");
  };

  const handleSaveListing = (event) => {
    event.preventDefault();
    setListings((prev) =>
      prev.map((item) => (item.id === editingListing.id ? { ...item, ...editingListing } : item))
    );
    setEditingListing(null);
    setNotice("Listing updated successfully.");
  };

  const handleReply = (event) => {
    event.preventDefault();
    if (!replyText.trim() || !selectedMessage) {
      return;
    }

    setMessages((prev) =>
      prev.map((message) =>
        message.id === selectedMessage.id
          ? {
              ...message,
              read: true,
              replied: true,
              reply: replyText.trim(),
            }
          : message
      )
    );
    setReplyText("");
    setNotice("Reply sent to the buyer.");
  };

  const handleBlockBuyer = (id) => {
    setMessages((prev) =>
      prev.map((message) =>
        message.id === id ? { ...message, blocked: true, read: true } : message
      )
    );
    setNotice("Buyer has been blocked from future messages.");
  };

  const handleProfileSave = (event) => {
    event.preventDefault();
    setNotice("Profile updated successfully.");
  };

  const handleAddListing = (event) => {
    event.preventDefault();

    if (!newCar.make || !newCar.model || !newCar.price || !newCar.location || !newCar.description) {
      setNotice("Please add the main details for your car before publishing.");
      return;
    }

    const parsedFeatures = newCar.features
      .split(",")
      .map((feature) => feature.trim())
      .filter(Boolean);

    const listing = {
      id: `${Date.now()}`,
      sellerId: user?.id || "2",
      make: newCar.make,
      model: newCar.model,
      year: Number(newCar.year) || new Date().getFullYear(),
      price: Number(newCar.price),
      mileage: Number(newCar.mileage) || 0,
      location: newCar.location,
      color: newCar.color || "Black",
      fuel: newCar.fuel || "Petrol",
      transmission: newCar.transmission || "Automatic",
      description: newCar.description,
      images: [newCar.imageUrl || "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800"],
      features: parsedFeatures.length ? parsedFeatures : ["Well maintained"],
      createdAt: new Date().toISOString(),
      status: "active",
    };

    const updatedListings = [listing, ...listings];
    setListings(updatedListings);
    persistMarketplaceListings(updatedListings);
    setActiveTab("cars");
    setShowAddCarModal(false);
    setNewCar(initialNewCar);
    setNotice("Your car has been published to the marketplace.");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <Link to="/" className="rounded-full border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <p className="text-sm font-medium text-indigo-600">Seller Dashboard</p>
              <h1 className="text-2xl font-semibold text-slate-900">Welcome back, {user?.name || profile.name}</h1>
            </div>
          </div>
          <div className="rounded-full bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700">
            {notice}
          </div>
        </div>

        <div className="mb-6 grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-sky-500 p-7 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="mb-2 flex items-center gap-2 text-sm font-medium text-indigo-100">
                  <Sparkles className="h-4 w-4" />
                  Your selling hub
                </p>
                <h2 className="text-3xl font-semibold">Manage cars, buyers, and your profile in one place.</h2>
              </div>
              <div className="hidden rounded-2xl bg-white/15 p-3 sm:block">
                <CarFront className="h-8 w-8" />
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => setActiveTab("cars")}
                className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-indigo-700 transition hover:opacity-90"
              >
                Manage Listings
              </button>
              <button
                onClick={() => setActiveTab("messages")}
                className="rounded-full border border-white/40 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                View Messages
              </button>
            </div>
          </div>

          <div className="grid gap-3 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Your rating</p>
                <p className="text-xl font-semibold text-slate-900">{stats.rating.toFixed(1)} / 5</p>
              </div>
              <div className="flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-amber-600">
                <Star className="h-4 w-4 fill-current" />
                <span className="text-sm font-semibold">Top-rated seller</span>
              </div>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-indigo-100 p-3 text-indigo-600">
                  <Bell className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">New buyer inquiries</p>
                  <p className="text-sm text-slate-500">Stay ahead with faster replies and better insights.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-4">
          {[
            { label: "Active listings", value: stats.activeListings, accent: "from-indigo-500 to-blue-500" },
            { label: "Unread inquiries", value: stats.unreadMessages, accent: "from-amber-500 to-orange-500" },
            { label: "Blocked buyers", value: stats.blockedBuyers, accent: "from-rose-500 to-pink-500" },
            { label: "Responded today", value: messages.filter((item) => item.replied).length, accent: "from-emerald-500 to-green-500" },
          ].map((item) => (
            <div key={item.label} className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className={`h-2 w-20 rounded-full bg-gradient-to-r ${item.accent}`} />
              <p className="mt-3 text-sm text-slate-500">{item.label}</p>
              <p className="text-2xl font-semibold text-slate-900">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="mb-6 flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
          {[
            { key: "overview", label: "Overview" },
            { key: "cars", label: "My Cars" },
            { key: "messages", label: "Buyer Messages" },
            { key: "profile", label: "Profile" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                activeTab === tab.key ? "bg-indigo-600 text-white shadow" : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Recent buyer activity</h3>
                  <p className="text-sm text-slate-500">Keep your inquiries moving and your buyers informed.</p>
                </div>
                <button
                  onClick={() => setActiveTab("messages")}
                  className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-700"
                >
                  Open inbox
                </button>
              </div>
              <div className="space-y-3">
                {messages.slice(0, 3).map((message) => (
                  <div key={message.id} className="flex items-start justify-between rounded-2xl border border-slate-200 p-3">
                    <div>
                      <p className="font-semibold text-slate-900">{message.senderName}</p>
                      <p className="text-sm text-slate-500">{message.content}</p>
                    </div>
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${message.read ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                      {message.read ? "Read" : "New"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">Profile snapshot</h3>
              <div className="mt-4 flex items-center gap-3 rounded-2xl bg-slate-50 p-3">
                <div className="rounded-full bg-indigo-100 p-3 text-indigo-600">
                  <UserCircle2 className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{profile.name}</p>
                  <p className="text-sm text-slate-500">{profile.email}</p>
                </div>
              </div>
              <div className="mt-4 space-y-2 text-sm text-slate-600">
                <p><span className="font-semibold text-slate-900">Phone:</span> {profile.phone}</p>
                <p><span className="font-semibold text-slate-900">Location:</span> {profile.location}</p>
                <p><span className="font-semibold text-slate-900">About:</span> {profile.bio}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "cars" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Your listed cars</h3>
                <p className="text-sm text-slate-500">Edit details, preview listings, or remove outdated cars.</p>
              </div>
              <button
                onClick={() => setShowAddCarModal(true)}
                className="flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                <Plus className="h-4 w-4" />
                Add car
              </button>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              {listings.map((listing) => (
                <div key={listing.id} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                  <img src={listing.images[0]} alt={`${listing.make} ${listing.model}`} className="h-44 w-full object-cover" />
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium text-indigo-600">{listing.year}</p>
                        <h4 className="text-lg font-semibold text-slate-900">{listing.make} {listing.model}</h4>
                      </div>
                      <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                        {listing.status}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-slate-500">{listing.description}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-xl font-semibold text-slate-900">{listing.price.toLocaleString()} ETB</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingListing(listing)}
                          className="rounded-full border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100"
                        >
                          <PencilLine className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteListing(listing.id)}
                          className="rounded-full border border-rose-200 p-2 text-rose-600 transition hover:bg-rose-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "messages" && (
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Buyer inbox</h3>
                  <p className="text-sm text-slate-500">Read, reply, and control access.</p>
                </div>
                <div className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-700">
                  {messages.filter((item) => !item.read).length} new
                </div>
              </div>
              <div className="space-y-2">
                {messages.map((message) => (
                  <button
                    key={message.id}
                    onClick={() => {
                      setSelectedMessageId(message.id);
                      setMessages((prev) => prev.map((item) => item.id === message.id ? { ...item, read: true } : item));
                    }}
                    className={`w-full rounded-2xl border p-3 text-left transition ${selectedMessage?.id === message.id ? "border-indigo-500 bg-indigo-50" : "border-slate-200 hover:bg-slate-50"}`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-semibold text-slate-900">{message.senderName}</p>
                      <span className={`rounded-full px-2 py-1 text-[11px] font-semibold ${message.blocked ? "bg-rose-100 text-rose-700" : message.read ? "bg-slate-100 text-slate-700" : "bg-amber-100 text-amber-700"}`}>
                        {message.blocked ? "Blocked" : message.read ? "Read" : "New"}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-slate-500">{message.content}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              {selectedMessage ? (
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-indigo-600">Conversation</p>
                      <h3 className="text-lg font-semibold text-slate-900">{selectedMessage.senderName}</h3>
                    </div>
                    <button
                      onClick={() => handleBlockBuyer(selectedMessage.id)}
                      className="flex items-center gap-2 rounded-full border border-rose-200 px-3 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
                    >
                      <ShieldOff className="h-4 w-4" />
                      Block buyer
                    </button>
                  </div>

                  <div className="mt-5 rounded-2xl bg-slate-50 p-4">
                    <p className="text-sm font-semibold text-slate-900">Buyer asked:</p>
                    <p className="mt-2 text-sm text-slate-600">{selectedMessage.content}</p>
                  </div>

                  <form onSubmit={handleReply} className="mt-5 space-y-3">
                    <label className="text-sm font-semibold text-slate-700">Reply to buyer</label>
                    <textarea
                      value={replyText}
                      onChange={(event) => setReplyText(event.target.value)}
                      rows="4"
                      className="w-full rounded-2xl border border-slate-200 p-3 outline-none focus:border-indigo-500"
                      placeholder="Write a helpful reply to the buyer..."
                    />
                    <div className="flex flex-wrap gap-3">
                      <button
                        type="submit"
                        className="flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
                      >
                        <Send className="h-4 w-4" />
                        Send reply
                      </button>
                      {selectedMessage.replied && (
                        <div className="rounded-full bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">
                          Replied: {selectedMessage.reply}
                        </div>
                      )}
                    </div>
                  </form>
                </>
              ) : (
                <p className="text-sm text-slate-500">Select a buyer to read the conversation.</p>
              )}
            </div>
          </div>
        )}

        {activeTab === "profile" && (
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Edit your profile</h3>
                <p className="text-sm text-slate-500">Keep your details visible and professional for every buyer.</p>
              </div>
              <div className="rounded-full bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-700">
                Verified seller profile
              </div>
            </div>

            <form onSubmit={handleProfileSave} className="mt-6 grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-semibold text-slate-700">Full name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(event) => setProfile((prev) => ({ ...prev, name: event.target.value }))}
                  className="mt-2 w-full rounded-2xl border border-slate-200 p-3 outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700">Email</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(event) => setProfile((prev) => ({ ...prev, email: event.target.value }))}
                  className="mt-2 w-full rounded-2xl border border-slate-200 p-3 outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700">Phone number</label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(event) => setProfile((prev) => ({ ...prev, phone: event.target.value }))}
                  className="mt-2 w-full rounded-2xl border border-slate-200 p-3 outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700">Location</label>
                <input
                  type="text"
                  value={profile.location}
                  onChange={(event) => setProfile((prev) => ({ ...prev, location: event.target.value }))}
                  className="mt-2 w-full rounded-2xl border border-slate-200 p-3 outline-none focus:border-indigo-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-semibold text-slate-700">Short bio</label>
                <textarea
                  rows="4"
                  value={profile.bio}
                  onChange={(event) => setProfile((prev) => ({ ...prev, bio: event.target.value }))}
                  className="mt-2 w-full rounded-2xl border border-slate-200 p-3 outline-none focus:border-indigo-500"
                />
              </div>
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                >
                  Save profile
                </button>
              </div>
            </form>
          </div>
        )}

        {showAddCarModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4">
            <div className="w-full max-w-5xl rounded-3xl bg-white p-6 shadow-2xl">
              <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-indigo-600">Publish a new car</p>
                  <h3 className="text-xl font-semibold text-slate-900">Add your vehicle to the marketplace</h3>
                  <p className="mt-1 text-sm text-slate-500">Fill out the details below and your listing will appear for buyers immediately.</p>
                </div>
                <button
                  onClick={() => setShowAddCarModal(false)}
                  className="rounded-full border border-slate-200 px-3 py-1 text-sm font-semibold text-slate-600"
                >
                  Close
                </button>
              </div>

              <div className="mb-5 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">Listing preview</p>
                  <div className="mt-3 rounded-2xl bg-white p-3 shadow-sm">
                    <div className="h-32 rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500" />
                    <div className="mt-3">
                      <p className="text-xl font-semibold text-slate-900">{newCar.make || "Make"} {newCar.model || "Model"}</p>
                      <p className="text-sm text-slate-500">{newCar.location || "Location"}</p>
                      <p className="mt-2 text-lg font-semibold text-indigo-600">{newCar.price ? `${Number(newCar.price).toLocaleString()} ETB` : "Price"}</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-3xl border border-indigo-100 bg-indigo-50 p-4 text-sm text-indigo-700">
                  <p className="font-semibold">Tips for a strong listing</p>
                  <ul className="mt-2 space-y-2">
                    <li>• Add a clear title, location, and realistic price.</li>
                    <li>• Mention the car condition and key features.</li>
                    <li>• Use a strong image URL for a better first impression.</li>
                  </ul>
                </div>
              </div>

              <form onSubmit={handleAddListing} className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold text-slate-700">Make</label>
                  <input
                    value={newCar.make}
                    onChange={(event) => setNewCar((prev) => ({ ...prev, make: event.target.value }))}
                    className="mt-2 w-full rounded-2xl border border-slate-200 p-3 outline-none focus:border-indigo-500"
                    placeholder="Toyota"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700">Model</label>
                  <input
                    value={newCar.model}
                    onChange={(event) => setNewCar((prev) => ({ ...prev, model: event.target.value }))}
                    className="mt-2 w-full rounded-2xl border border-slate-200 p-3 outline-none focus:border-indigo-500"
                    placeholder="Camry"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700">Year</label>
                  <input
                    type="number"
                    value={newCar.year}
                    onChange={(event) => setNewCar((prev) => ({ ...prev, year: event.target.value }))}
                    className="mt-2 w-full rounded-2xl border border-slate-200 p-3 outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700">Price (ETB)</label>
                  <input
                    type="number"
                    value={newCar.price}
                    onChange={(event) => setNewCar((prev) => ({ ...prev, price: event.target.value }))}
                    className="mt-2 w-full rounded-2xl border border-slate-200 p-3 outline-none focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700">Mileage</label>
                  <input
                    type="number"
                    value={newCar.mileage}
                    onChange={(event) => setNewCar((prev) => ({ ...prev, mileage: event.target.value }))}
                    className="mt-2 w-full rounded-2xl border border-slate-200 p-3 outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700">Location</label>
                  <input
                    value={newCar.location}
                    onChange={(event) => setNewCar((prev) => ({ ...prev, location: event.target.value }))}
                    className="mt-2 w-full rounded-2xl border border-slate-200 p-3 outline-none focus:border-indigo-500"
                    placeholder="Addis Ababa"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700">Color</label>
                  <input
                    value={newCar.color}
                    onChange={(event) => setNewCar((prev) => ({ ...prev, color: event.target.value }))}
                    className="mt-2 w-full rounded-2xl border border-slate-200 p-3 outline-none focus:border-indigo-500"
                    placeholder="Silver"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700">Fuel</label>
                  <input
                    value={newCar.fuel}
                    onChange={(event) => setNewCar((prev) => ({ ...prev, fuel: event.target.value }))}
                    className="mt-2 w-full rounded-2xl border border-slate-200 p-3 outline-none focus:border-indigo-500"
                    placeholder="Petrol"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700">Transmission</label>
                  <input
                    value={newCar.transmission}
                    onChange={(event) => setNewCar((prev) => ({ ...prev, transmission: event.target.value }))}
                    className="mt-2 w-full rounded-2xl border border-slate-200 p-3 outline-none focus:border-indigo-500"
                    placeholder="Automatic"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700">Image URL</label>
                  <input
                    value={newCar.imageUrl}
                    onChange={(event) => setNewCar((prev) => ({ ...prev, imageUrl: event.target.value }))}
                    className="mt-2 w-full rounded-2xl border border-slate-200 p-3 outline-none focus:border-indigo-500"
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700">Features</label>
                  <input
                    value={newCar.features}
                    onChange={(event) => setNewCar((prev) => ({ ...prev, features: event.target.value }))}
                    className="mt-2 w-full rounded-2xl border border-slate-200 p-3 outline-none focus:border-indigo-500"
                    placeholder="Bluetooth, Backup Camera"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-semibold text-slate-700">Description</label>
                  <textarea
                    value={newCar.description}
                    onChange={(event) => setNewCar((prev) => ({ ...prev, description: event.target.value }))}
                    rows="4"
                    className="mt-2 w-full rounded-2xl border border-slate-200 p-3 outline-none focus:border-indigo-500"
                    placeholder="Describe the car condition, ownership history, and key highlights"
                    required
                  />
                </div>
                <div className="md:col-span-2 flex justify-end">
                  <button
                    type="submit"
                    className="rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                  >
                    Publish car
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {editingListing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4">
            <div className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-2xl">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-indigo-600">Edit listing</p>
                  <h3 className="text-xl font-semibold text-slate-900">{editingListing.make} {editingListing.model}</h3>
                </div>
                <button onClick={() => setEditingListing(null)} className="rounded-full border border-slate-200 px-3 py-1 text-sm font-semibold text-slate-600">Cancel</button>
              </div>

              <form onSubmit={handleSaveListing} className="space-y-3">
                <div className="grid gap-3 md:grid-cols-2">
                  <input
                    value={editingListing.make}
                    onChange={(event) => setEditingListing((prev) => ({ ...prev, make: event.target.value }))}
                    className="rounded-2xl border border-slate-200 p-3 outline-none focus:border-indigo-500"
                    placeholder="Make"
                  />
                  <input
                    value={editingListing.model}
                    onChange={(event) => setEditingListing((prev) => ({ ...prev, model: event.target.value }))}
                    className="rounded-2xl border border-slate-200 p-3 outline-none focus:border-indigo-500"
                    placeholder="Model"
                  />
                  <input
                    value={editingListing.price}
                    onChange={(event) => setEditingListing((prev) => ({ ...prev, price: Number(event.target.value) }))}
                    type="number"
                    className="rounded-2xl border border-slate-200 p-3 outline-none focus:border-indigo-500"
                    placeholder="Price"
                  />
                  <input
                    value={editingListing.location}
                    onChange={(event) => setEditingListing((prev) => ({ ...prev, location: event.target.value }))}
                    className="rounded-2xl border border-slate-200 p-3 outline-none focus:border-indigo-500"
                    placeholder="Location"
                  />
                </div>
                <textarea
                  value={editingListing.description}
                  onChange={(event) => setEditingListing((prev) => ({ ...prev, description: event.target.value }))}
                  rows="4"
                  className="w-full rounded-2xl border border-slate-200 p-3 outline-none focus:border-indigo-500"
                  placeholder="Description"
                />
                <button type="submit" className="rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700">
                  Save changes
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
