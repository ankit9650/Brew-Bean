const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Invoice PDFs are behind auth, so a plain <a href> can't carry the
// Authorization header — fetch as a blob and trigger the save ourselves.
export async function downloadInvoicePdf({ orderId, token, filename }) {
  const res = await fetch(`${API_URL}/api/v1/billing/orders/${orderId}/pdf`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    let message = "Invoice not available for this order.";
    try {
      message = (await res.json())?.message || message;
    } catch {}
    throw new Error(message);
  }

  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename || `invoice-order-${orderId}.pdf`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
