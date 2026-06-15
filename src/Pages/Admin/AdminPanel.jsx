import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import NotificationBell from "../../Components/NotificationBell";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { logout, selectCurrentUser } from "../../redux/reducers/authSlice";
import { useLogoutMutation } from "../../redux/services/authApi";
import {
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
  useGetAdminProductsQuery,
  useGetCategoriesQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetContactsQuery,
  useMarkContactReadMutation,
} from "../../redux/services/adminApi";

// ─── Constants ────────────────────────────────────────────────────────────────

const ORDER_STATUSES = ["pending", "confirmed", "preparing", "ready", "delivered", "cancelled"];

const STATUS_STYLES = {
  pending:   "bg-amber-100   text-amber-800  dark:bg-amber-900/40  dark:text-amber-300",
  confirmed: "bg-blue-100    text-blue-800   dark:bg-blue-900/40   dark:text-blue-300",
  preparing: "bg-purple-100  text-purple-800 dark:bg-purple-900/40 dark:text-purple-300",
  ready:     "bg-teal-100    text-teal-800   dark:bg-teal-900/40   dark:text-teal-300",
  delivered: "bg-green-100   text-green-800  dark:bg-green-900/40  dark:text-green-300",
  cancelled: "bg-red-100     text-red-800    dark:bg-red-900/40    dark:text-red-300",
};

const EMPTY_FORM = {
  name: "", slug: "", category_id: "", price: "",
  description: "", image_url: "", is_featured: false, tags: "",
};

const toSlug = (s) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const NAV = [
  { id: "overview",  label: "Overview",  icon: "▦" },
  { id: "orders",    label: "Orders",    icon: "📋" },
  { id: "products",  label: "Products",  icon: "☕" },
  { id: "messages",  label: "Messages",  icon: "✉" },
];

// ─── Small shared components ──────────────────────────────────────────────────

function StatusBadge({ status }) {
  return (
    <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wide ${STATUS_STYLES[status] ?? STATUS_STYLES.pending}`}>
      {status}
    </span>
  );
}

function StatCard({ label, value, sub, color }) {
  return (
    <motion.div
      className="bg-[#241712] border border-white/10 rounded-2xl p-5 flex flex-col gap-1"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <span className="text-brand-latte/60 text-xs uppercase tracking-widest">{label}</span>
      <span className={`text-3xl font-bold font-serif ${color}`}>{value}</span>
      {sub && <span className="text-brand-latte/50 text-xs">{sub}</span>}
    </motion.div>
  );
}

function Spinner() {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="w-8 h-8 rounded-full border-2 border-brand-caramel border-t-transparent animate-spin" />
    </div>
  );
}

function SectionTitle({ children }) {
  return <h2 className="text-lg font-serif font-bold text-brand-cream mb-4">{children}</h2>;
}

// ─── Tab: Overview ────────────────────────────────────────────────────────────

function OverviewTab() {
  const { data: ordersRes, isLoading: oLoading } = useGetAllOrdersQuery({ limit: 500 });
  const { data: prodsRes,  isLoading: pLoading } = useGetAdminProductsQuery({ limit: 500 });
  const { data: msgsRes }  = useGetContactsQuery({ unread: true, limit: 1 });

  const orders   = ordersRes?.data ?? [];
  const products = prodsRes?.data?.products ?? [];
  const unread   = msgsRes?.data?.total ?? 0;

  const revenue = useMemo(
    () => orders.reduce((s, o) => s + parseFloat(o.total_amount || 0), 0),
    [orders]
  );
  const pending  = orders.filter((o) => o.status === "pending").length;
  const active   = products.filter((p) => p.is_available).length;
  const recent   = [...orders].slice(0, 8);

  if (oLoading || pLoading) return <Spinner />;

  return (
    <div className="space-y-8">
      <div>
        <SectionTitle>Dashboard Overview</SectionTitle>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Orders"   value={orders.length}        color="text-brand-caramel" />
          <StatCard label="Revenue"        value={`₹${revenue.toFixed(0)}`} color="text-green-400" sub="all time" />
          <StatCard label="Pending"        value={pending}              color="text-amber-400"   sub="need action" />
          <StatCard label="Active Products" value={active}             color="text-blue-400"    sub={`of ${products.length} total`} />
        </div>
        {unread > 0 && (
          <div className="mt-4 flex items-center gap-2 text-sm text-amber-400 bg-amber-900/20 border border-amber-700/40 rounded-xl px-4 py-3">
            <span>✉</span>
            <span><strong>{unread}</strong> unread message{unread !== 1 ? "s" : ""} in your inbox.</span>
          </div>
        )}
      </div>

      <div>
        <SectionTitle>Recent Orders</SectionTitle>
        {recent.length === 0 ? (
          <p className="text-brand-latte/50 text-sm">No orders yet.</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-sm text-left">
              <thead className="bg-[#0f0703] text-brand-latte/60 text-xs uppercase tracking-wider">
                <tr>
                  {["#", "Customer", "Total", "Method", "Status", "Date"].map((h) => (
                    <th key={h} className="px-4 py-3 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recent.map((o) => (
                  <tr key={o.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 font-bold text-brand-caramel">#{o.id}</td>
                    <td className="px-4 py-3">
                      <div className="text-brand-cream">{o.customer_name || "—"}</div>
                      <div className="text-brand-latte/50 text-xs">{o.customer_email || ""}</div>
                    </td>
                    <td className="px-4 py-3 font-semibold text-brand-cream">₹{parseFloat(o.total_amount).toFixed(2)}</td>
                    <td className="px-4 py-3 text-brand-latte/70 uppercase text-xs">{o.payment_method}</td>
                    <td className="px-4 py-3"><StatusBadge status={o.status} /></td>
                    <td className="px-4 py-3 text-brand-latte/50 text-xs">
                      {new Date(o.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Tab: Orders ──────────────────────────────────────────────────────────────

function OrdersTab() {
  const [statusFilter, setStatusFilter] = useState("all");
  const query = statusFilter === "all" ? {} : { status: statusFilter };
  const { data, isLoading, isFetching } = useGetAllOrdersQuery({ ...query, limit: 100 });
  const [updateStatus] = useUpdateOrderStatusMutation();

  const orders = data?.data ?? [];

  const handleStatus = async (id, status) => {
    try {
      await updateStatus({ id, status }).unwrap();
      toast.success(`Order #${id} → ${status}`);
    } catch {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        {["all", ...ORDER_STATUSES].map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wide transition-colors ${
              statusFilter === s
                ? "bg-brand-caramel text-brand-espresso"
                : "bg-white/5 text-brand-latte/70 hover:bg-white/10"
            }`}
          >
            {s}
          </button>
        ))}
        {isFetching && <div className="w-4 h-4 rounded-full border-2 border-brand-caramel border-t-transparent animate-spin ml-2" />}
      </div>

      {isLoading ? <Spinner /> : orders.length === 0 ? (
        <p className="text-brand-latte/50 text-sm py-8 text-center">No orders for this filter.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#0f0703] text-brand-latte/60 text-xs uppercase tracking-wider">
              <tr>
                {["#", "Customer", "Items", "Total", "Method", "Address", "Status", "Date"].map((h) => (
                  <th key={h} className="px-4 py-3 font-medium whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-white/5 transition-colors align-top">
                  <td className="px-4 py-3 font-bold text-brand-caramel whitespace-nowrap">#{o.id}</td>
                  <td className="px-4 py-3">
                    <div className="text-brand-cream font-medium">{o.customer_name || "Guest"}</div>
                    <div className="text-brand-latte/50 text-xs">{o.customer_email || ""}</div>
                  </td>
                  <td className="px-4 py-3 text-brand-latte/70">{o.item_count}</td>
                  <td className="px-4 py-3 font-semibold text-brand-cream whitespace-nowrap">
                    ₹{parseFloat(o.total_amount).toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-brand-latte/70 uppercase text-xs whitespace-nowrap">
                    {o.payment_method}
                  </td>
                  <td className="px-4 py-3 text-brand-latte/50 text-xs max-w-[160px] truncate">
                    {o.delivery_address || "—"}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={o.status}
                      onChange={(e) => handleStatus(o.id, e.target.value)}
                      className="bg-[#1a0f0b] border border-white/15 text-brand-cream text-xs rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-brand-caramel cursor-pointer"
                    >
                      {ORDER_STATUSES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-brand-latte/50 text-xs whitespace-nowrap">
                    {new Date(o.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── Tab: Products ────────────────────────────────────────────────────────────

function ProductsTab() {
  const { data: prodsRes, isLoading } = useGetAdminProductsQuery({ limit: 200 });
  const { data: catsRes } = useGetCategoriesQuery();
  const [createProduct, { isLoading: creating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: updating }] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const products   = prodsRes?.data?.products ?? [];
  const categories = catsRes?.data ?? [];

  const [form, setForm]         = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm]  = useState(false);
  const [confirmId, setConfirmId] = useState(null);

  const setField = (k, v) =>
    setForm((f) => ({
      ...f,
      [k]: v,
      ...(k === "name" && !editingId ? { slug: toSlug(v) } : {}),
    }));

  const openAdd = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setShowForm(true);
  };

  const openEdit = (p) => {
    setForm({
      name: p.name,
      slug: p.slug,
      category_id: p.category_id ?? "",
      price: p.price,
      description: p.description ?? "",
      image_url: p.image_url ?? "",
      is_featured: p.is_featured,
      tags: Array.isArray(p.tags) ? p.tags.join(", ") : "",
    });
    setEditingId(p.id);
    setShowForm(true);
  };

  const closeForm = () => { setShowForm(false); setEditingId(null); setForm(EMPTY_FORM); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      price: parseFloat(form.price),
      category_id: form.category_id ? parseInt(form.category_id) : null,
      tags: form.tags ? form.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
    };
    try {
      if (editingId) {
        await updateProduct({ id: editingId, ...payload }).unwrap();
        toast.success("Product updated");
      } else {
        await createProduct(payload).unwrap();
        toast.success("Product added");
      }
      closeForm();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to save product");
    }
  };

  const handleToggleAvail = async (p) => {
    try {
      await updateProduct({ id: p.id, is_available: !p.is_available }).unwrap();
      toast.success(`"${p.name}" ${p.is_available ? "hidden from menu" : "restored to menu"}`);
    } catch {
      toast.error("Update failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id).unwrap();
      toast.success("Product removed from menu");
      setConfirmId(null);
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <SectionTitle>Products ({products.length})</SectionTitle>
        <button
          onClick={showForm && !editingId ? closeForm : openAdd}
          className="px-4 py-2 bg-brand-caramel hover:bg-brand-caramel-light text-brand-espresso font-bold text-sm rounded-xl transition-colors"
        >
          {showForm && !editingId ? "✕ Cancel" : "+ Add Product"}
        </button>
      </div>

      {/* Add / Edit form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            key="product-form"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-[#241712] border border-white/10 rounded-2xl p-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <h3 className="sm:col-span-2 text-brand-cream font-bold font-serif">
                {editingId ? "Edit Product" : "New Product"}
              </h3>

              {[
                { label: "Name", key: "name", type: "text", required: true },
                { label: "Slug", key: "slug", type: "text", required: true },
                { label: "Price (₹)", key: "price", type: "number", required: true },
                { label: "Image URL", key: "image_url", type: "url" },
              ].map(({ label, key, type, required }) => (
                <div key={key}>
                  <label className="block text-xs text-brand-latte/60 mb-1">{label}</label>
                  <input
                    type={type}
                    value={form[key]}
                    onChange={(e) => setField(key, e.target.value)}
                    required={required}
                    step={type === "number" ? "0.01" : undefined}
                    className="w-full bg-[#1a0f0b] border border-white/15 text-brand-cream text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-brand-caramel"
                  />
                </div>
              ))}

              <div>
                <label className="block text-xs text-brand-latte/60 mb-1">Category</label>
                <select
                  value={form.category_id}
                  onChange={(e) => setField("category_id", e.target.value)}
                  className="w-full bg-[#1a0f0b] border border-white/15 text-brand-cream text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-brand-caramel"
                >
                  <option value="">— None —</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs text-brand-latte/60 mb-1">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={form.tags}
                  onChange={(e) => setField("tags", e.target.value)}
                  placeholder="hot, espresso, seasonal"
                  className="w-full bg-[#1a0f0b] border border-white/15 text-brand-cream text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-brand-caramel"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs text-brand-latte/60 mb-1">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setField("description", e.target.value)}
                  rows={3}
                  className="w-full bg-[#1a0f0b] border border-white/15 text-brand-cream text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-brand-caramel resize-none"
                />
              </div>

              <div className="sm:col-span-2 flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.is_featured}
                    onChange={(e) => setField("is_featured", e.target.checked)}
                    className="accent-brand-caramel w-4 h-4"
                  />
                  <span className="text-sm text-brand-latte/70">Featured on homepage</span>
                </label>

                <div className="ml-auto flex gap-3">
                  <button type="button" onClick={closeForm} className="px-4 py-2 text-sm text-brand-latte/60 hover:text-brand-cream transition-colors">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={creating || updating}
                    className="px-5 py-2 bg-brand-caramel hover:bg-brand-caramel-light text-brand-espresso font-bold text-sm rounded-xl transition-colors disabled:opacity-50"
                  >
                    {creating || updating ? "Saving…" : editingId ? "Update" : "Create"}
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Product list */}
      {isLoading ? <Spinner /> : products.length === 0 ? (
        <p className="text-brand-latte/50 text-sm text-center py-8">No products found.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#0f0703] text-brand-latte/60 text-xs uppercase tracking-wider">
              <tr>
                {["Image", "Name", "Category", "Price", "Featured", "Available", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 font-medium whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {products.map((p) => (
                <tr key={p.id} className={`hover:bg-white/5 transition-colors ${!p.is_available ? "opacity-50" : ""}`}>
                  <td className="px-4 py-3">
                    {p.image_url ? (
                      <img src={p.image_url} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-lg">☕</div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-brand-cream font-medium">{p.name}</div>
                    <div className="text-brand-latte/40 text-xs">{p.slug}</div>
                  </td>
                  <td className="px-4 py-3 text-brand-latte/60 text-xs">{p.category_name || "—"}</td>
                  <td className="px-4 py-3 font-semibold text-brand-caramel">₹{parseFloat(p.price).toFixed(2)}</td>
                  <td className="px-4 py-3">
                    {p.is_featured ? (
                      <span className="text-brand-caramel text-xs font-bold">★ Yes</span>
                    ) : (
                      <span className="text-brand-latte/30 text-xs">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleToggleAvail(p)}
                      className={`relative w-10 h-5 rounded-full transition-colors ${p.is_available ? "bg-green-500" : "bg-white/20"}`}
                      title={p.is_available ? "Click to hide" : "Click to restore"}
                    >
                      <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${p.is_available ? "left-5" : "left-0.5"}`} />
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEdit(p)}
                        className="px-3 py-1 text-xs rounded-lg bg-white/10 hover:bg-white/20 text-brand-cream transition-colors"
                      >
                        Edit
                      </button>
                      {confirmId === p.id ? (
                        <div className="flex gap-1">
                          <button
                            onClick={() => handleDelete(p.id)}
                            className="px-2 py-1 text-xs rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setConfirmId(null)}
                            className="px-2 py-1 text-xs rounded-lg bg-white/10 text-brand-latte/60 transition-colors"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmId(p.id)}
                          className="px-3 py-1 text-xs rounded-lg bg-red-900/30 hover:bg-red-900/60 text-red-400 transition-colors"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── Tab: Messages ────────────────────────────────────────────────────────────

function MessagesTab() {
  const [unreadOnly, setUnreadOnly] = useState(false);
  const { data, isLoading } = useGetContactsQuery({ unread: unreadOnly, limit: 50 });
  const [markRead] = useMarkContactReadMutation();

  const contacts = data?.data?.contacts ?? [];

  const handleMarkRead = async (id) => {
    try {
      await markRead(id).unwrap();
      toast.success("Marked as read");
    } catch {
      toast.error("Failed");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <SectionTitle>Messages ({data?.data?.total ?? 0})</SectionTitle>
        <button
          onClick={() => setUnreadOnly((v) => !v)}
          className={`ml-auto px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
            unreadOnly ? "bg-brand-caramel text-brand-espresso" : "bg-white/5 text-brand-latte/60 hover:bg-white/10"
          }`}
        >
          {unreadOnly ? "Showing Unread" : "Show Unread Only"}
        </button>
      </div>

      {isLoading ? <Spinner /> : contacts.length === 0 ? (
        <p className="text-brand-latte/50 text-sm text-center py-8">No messages found.</p>
      ) : (
        <div className="space-y-3">
          {contacts.map((c) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-[#241712] border rounded-2xl p-5 transition-opacity ${
                c.is_read ? "border-white/5 opacity-60" : "border-brand-caramel/30"
              }`}
            >
              <div className="flex flex-wrap items-start gap-3 mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-brand-cream">{c.name}</span>
                    {!c.is_read && (
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-brand-caramel text-brand-espresso rounded-full uppercase">
                        New
                      </span>
                    )}
                  </div>
                  <div className="text-brand-latte/50 text-xs mt-0.5">
                    {c.email}{c.phone ? ` · ${c.phone}` : ""}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-brand-latte/40 text-xs">
                    {new Date(c.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </span>
                  {!c.is_read && (
                    <button
                      onClick={() => handleMarkRead(c.id)}
                      className="px-3 py-1 text-xs rounded-lg bg-white/10 hover:bg-white/20 text-brand-cream transition-colors"
                    >
                      Mark Read
                    </button>
                  )}
                </div>
              </div>
              <p className="text-brand-latte/80 text-sm leading-relaxed">{c.message}</p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function Sidebar({ activeTab, onTabChange, user, onLogout, onClose }) {
  return (
    <div className="flex flex-col h-full bg-[#0f0703] px-4 py-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-brand-caramel font-serif font-bold text-xl">Brew & Bean</div>
            <div className="text-brand-latte/40 text-xs mt-0.5">Admin Panel</div>
          </div>
          {onClose && (
            <button onClick={onClose} className="lg:hidden text-brand-latte/40 hover:text-brand-cream text-xl">✕</button>
          )}
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {NAV.map((item) => (
          <button
            key={item.id}
            onClick={() => { onTabChange(item.id); onClose?.(); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors text-left ${
              activeTab === item.id
                ? "bg-brand-caramel/20 text-brand-caramel"
                : "text-brand-latte/60 hover:text-brand-cream hover:bg-white/5"
            }`}
          >
            <span className="text-base w-5 text-center">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="mt-6 pt-6 border-t border-white/10">
        <div className="flex items-center gap-3 mb-4 px-2">
          <div className="w-8 h-8 rounded-full bg-brand-caramel/30 flex items-center justify-center text-brand-caramel font-bold text-sm">
            {user?.name?.charAt(0)?.toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-brand-cream text-sm font-medium truncate">{user?.name}</div>
            <div className="text-brand-latte/40 text-xs truncate">{user?.email}</div>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="w-full px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-xl transition-colors text-left"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

// ─── Main: AdminPanel ─────────────────────────────────────────────────────────

const TAB_COMPONENTS = {
  overview: <OverviewTab />,
  orders:   <OrdersTab />,
  products: <ProductsTab />,
  messages: <MessagesTab />,
};

export default function AdminPanel() {
  const navigate   = useNavigate();
  const dispatch   = useDispatch();
  const user       = useSelector(selectCurrentUser);
  const [logoutApi] = useLogoutMutation();

  const [activeTab,   setActiveTab]   = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const rt = localStorage.getItem("brewbean_refresh_token");
      if (rt) await logoutApi({ refreshToken: rt }).unwrap();
    } catch { /* ignore */ }
    dispatch(logout());
    toast.success("Signed out");
    navigate("/");
  };

  const sidebarProps = {
    activeTab,
    onTabChange: setActiveTab,
    user,
    onLogout: handleLogout,
  };

  const activeLabel = NAV.find((n) => n.id === activeTab)?.label ?? "";

  return (
    <div className="min-h-screen bg-[#1a0f0b] flex text-brand-cream">
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 flex-none fixed inset-y-0 left-0 overflow-y-auto z-20">
        <Sidebar {...sidebarProps} />
      </aside>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              key="overlay"
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/70 z-30 lg:hidden"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            />
            <motion.aside
              key="mobile-sidebar"
              className="fixed inset-y-0 left-0 w-64 z-40 lg:hidden overflow-y-auto"
              initial={{ x: -256 }} animate={{ x: 0 }} exit={{ x: -256 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <Sidebar {...sidebarProps} onClose={() => setSidebarOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 lg:ml-64 min-h-screen flex flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-10 bg-[#1a0f0b]/90 backdrop-blur-sm border-b border-white/10 px-4 lg:px-8 py-4 flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-brand-latte/60 hover:text-brand-cream text-xl"
          >
            ☰
          </button>
          <h1 className="text-brand-cream font-serif font-bold text-lg">{activeLabel}</h1>
          <div className="ml-auto flex items-center gap-3">
            <NotificationBell iconClass="text-brand-cream" />
            <button
              onClick={() => navigate("/")}
              className="text-xs text-brand-latte/50 hover:text-brand-cream transition-colors"
            >
              ← Back to site
            </button>
          </div>
        </header>

        {/* Tab content */}
        <main className="flex-1 p-4 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {TAB_COMPONENTS[activeTab]}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
