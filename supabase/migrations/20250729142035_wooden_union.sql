/*
  # Système de gestion des messages de contact

  1. Nouvelles Tables
    - `contact_messages`
      - `id` (uuid, primary key)
      - `first_name` (text)
      - `last_name` (text)
      - `email` (text)
      - `subject` (text)
      - `profile` (text)
      - `message` (text)
      - `newsletter_consent` (boolean)
      - `created_at` (timestamp)
      - `processed` (boolean)
      - `processed_at` (timestamp)

  2. Sécurité
    - Enable RLS sur `contact_messages` table
    - Add policy pour permettre l'insertion publique
    - Add policy pour la lecture par les administrateurs
*/

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  profile text,
  message text NOT NULL,
  newsletter_consent boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  processed boolean DEFAULT false,
  processed_at timestamptz
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre l'insertion publique des messages
CREATE POLICY "Anyone can submit contact messages"
  ON contact_messages
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Politique pour permettre la lecture aux utilisateurs authentifiés (administrateurs)
CREATE POLICY "Authenticated users can read contact messages"
  ON contact_messages
  FOR SELECT
  TO authenticated
  USING (true);

-- Politique pour permettre la mise à jour aux utilisateurs authentifiés
CREATE POLICY "Authenticated users can update contact messages"
  ON contact_messages
  FOR UPDATE
  TO authenticated
  USING (true);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_processed ON contact_messages(processed);
CREATE INDEX IF NOT EXISTS idx_contact_messages_email ON contact_messages(email);