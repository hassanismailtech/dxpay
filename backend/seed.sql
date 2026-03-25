-- Create a dummy lab provider
INSERT INTO Providers (name, type) VALUES ('Lagos Central Lab', 'lab');

-- Create the PRD sample tests linked to provider_id 1
INSERT INTO Tests (name, price, provider_id) VALUES 
('Malaria Test', 5000.00, 1),
('Full Blood Count', 7000.00, 1),
('Typhoid Test', 4500.00, 1);