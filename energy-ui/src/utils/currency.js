/**
 * Format currency value to Indian Rupees (₹)
 * @param {number} value - The value to format
 * @returns {string} Formatted currency string with ₹ symbol
 */
export const formatCurrency = (value) => {
  if (value === undefined || value === null || isNaN(value)) {
    return '₹0.00';
  }
  return `₹${parseFloat(value).toFixed(2)}`;
};

/**
 * Format large currency values with abbreviated notation (K, L, Cr)
 * @param {number} value - The value to format
 * @returns {string} Abbreviated currency string
 */
export const formatCurrencyShort = (value) => {
  if (value === undefined || value === null || isNaN(value)) {
    return '₹0';
  }

  const absValue = Math.abs(value);
  
  if (absValue >= 10000000) {
    return `₹${(value / 10000000).toFixed(1)}Cr`;
  } else if (absValue >= 100000) {
    return `₹${(value / 100000).toFixed(1)}L`;
  } else if (absValue >= 1000) {
    return `₹${(value / 1000).toFixed(1)}K`;
  }
  
  return formatCurrency(value);
};

/**
 * Parse array of numeric values into structured format for charts
 * @param {number[]} values - Array of cost/value numbers
 * @returns {Object[]} Array of objects with index and value
 */
export const transformTrendData = (values) => {
  if (!Array.isArray(values)) return [];
  return values.map((value, index) => ({
    generation: index + 1,
    cost: parseFloat(value)
  }));
};
