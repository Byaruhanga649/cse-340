-- ========================================
-- Organization Table
-- ========================================

CREATE TABLE organization (
organization_id SERIAL PRIMARY KEY,
name VARCHAR(150) NOT NULL,
description TEXT NOT NULL,
contact_email VARCHAR(255) NOT NULL,
logo_filename VARCHAR(255) NOT NULL
);

-- ========================================
-- Insert Sample Organizations
-- ========================================

INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
(
'BrightFuture Builders',
'A nonprofit focused on improving community infrastructure through sustainable construction projects.',
'[info@brightfuturebuilders.org](mailto:info@brightfuturebuilders.org)',
'brightfuture-logo.png'
),
(
'GreenHarvest Growers',
'An urban farming collective promoting food sustainability and education in local neighborhoods.',
'[contact@greenharvest.org](mailto:contact@greenharvest.org)',
'greenharvest-logo.png'
),
(
'UnityServe Volunteers',
'A volunteer coordination group supporting local charities and service initiatives.',
'[hello@unityserve.org](mailto:hello@unityserve.org)',
'unityserve-logo.png'
);


-- Create Service Projects table
CREATE TABLE IF NOT EXISTS serviceproject (
    project_id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    pr_location VARCHAR(150) NOT NULL,
    pr_date DATE NOT NULL,
    FOREIGN KEY (organization_id)
        REFERENCES organization(organization_id)
);

-- Insert Service Projects

-- Helping Hands Community
INSERT INTO serviceproject
(organization_id, title, description, pr_location, pr_date)
VALUES
(1, 'Downtown Food Drive', 'Collect and sort non-perishable food donations for local families in need.', 'Central Community Center', '2026-11-14'),
(1, 'Neighborhood Park Cleanup', 'Volunteers pick up litter and repaint benches at the city park.', 'Riverside Park', '2026-11-21'),
(1, 'Winter Coat Giveaway', 'Distribute donated winter coats to families and individuals.', 'First Street Church Hall', '2026-12-05'),
(1, 'Senior Meal Delivery', 'Deliver hot meals to homebound seniors in the community.', 'Maple Heights Senior Center', '2026-12-12'),
(1, 'Holiday Toy Drive', 'Collect and wrap new toys for children in local shelters.', 'Main Street Library', '2026-12-19');

-- Green Future Alliance
INSERT INTO serviceproject
(organization_id, title, description, pr_location, pr_date)
VALUES
(2, 'Community Tree Planting', 'Plant native trees along the riverbank to prevent erosion.', 'Willow Creek Trail', '2026-11-16'),
(2, 'River Cleanup Day', 'Remove trash and debris from the river and surrounding banks.', 'Eastside River Landing', '2026-11-23'),
(2, 'Community Garden Build', 'Construct raised garden beds and plant winter vegetables.', 'Oak Avenue Lot', '2026-12-07'),
(2, 'Recycling Awareness Workshop', 'Teach residents how to sort recyclables and reduce household waste.', 'City Hall Auditorium', '2026-12-14'),
(2, 'Pollinator Habitat Project', 'Create a wildflower habitat to support bees and butterflies.', 'Sunnyside Meadow', '2027-01-10');

-- Bright Minds Foundation
INSERT INTO serviceproject
(organization_id, title, description, pr_location, pr_date)
VALUES
(3, 'After-School Tutoring', 'Provide free math and reading tutoring for elementary students.', 'Lincoln Elementary School', '2026-11-18'),
(3, 'School Supply Drive', 'Collect backpacks, notebooks, and pencils for students in need.', 'Westfield Public Library', '2026-11-25'),
(3, 'Family Literacy Night', 'Host an evening of story time and book giveaways for families.', 'Community Learning Center', '2026-12-09'),
(3, 'Computer Skills Workshop', 'Teach basic computer and internet skills to adults and seniors.', 'Eastside Library Computer Lab', '2026-12-16'),
(3, 'Book Donation Drive', 'Collect gently used books to stock classroom libraries.', 'Bright Minds Office', '2027-01-13');