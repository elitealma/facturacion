-- Create the invoices table
CREATE TABLE IF NOT EXISTS public.invoices (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    source TEXT NOT NULL, -- Droshippers, Ecommerce, Respond
    id_dropi TEXT,
    product TEXT NOT NULL,
    sku TEXT,
    quantity INTEGER DEFAULT 1,
    price NUMERIC(10, 2) NOT NULL,
    total NUMERIC(10, 2) NOT NULL,
    method TEXT, -- Payment method
    status TEXT DEFAULT 'Pending' -- Pending, Synced, Error
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;

-- Allow public access for now
CREATE POLICY "Allow all actions for now"
ON public.invoices FOR ALL
USING (true);
