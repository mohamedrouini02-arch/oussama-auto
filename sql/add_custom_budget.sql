-- Add custom_budget column to orders table for custom budget amounts
ALTER TABLE orders ADD COLUMN IF NOT EXISTS custom_budget text;

-- Update the column comment
COMMENT ON COLUMN orders.custom_budget IS 'Custom budget amount when user selects "Other" in budget dropdown';
