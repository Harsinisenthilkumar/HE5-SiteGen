/**
 * Curated high-quality royalty-free image library using permanent Unsplash photo IDs.
 * Includes multiple business categories as requested.
 */

export interface BusinessCategoryImages {
  hero: string[];
  about: string[];
  gallery: string[];
  services: string[];
}

export const IMAGE_POOL: Record<string, BusinessCategoryImages> = {
  restaurant: {
    hero: [
      'photo-1517248135467-4c7edcad34c4', // Beautiful restaurant interior
      'photo-1555396273-367ea4eb4db5', // Chef preparing gourmet plate
      'photo-1514933651103-005eec06c04b', // Elegant bistro dining room
      'photo-1552566626-52f8b828add9', // Fine dining table setup
      'photo-1414235077428-338989a2e8c0'  // Exquisite french food dish
    ],
    about: [
      'photo-1600565193348-f74bd3c7ccdf', // Professional kitchen team at work
      'photo-1577219491135-ce391730fb2c', // Chef smiling in kitchen
      'photo-1559339352-11d035aa65de', // Staff serving guests
      'photo-1508766917616-d22f3f1eea14', // Cozy group dining
      'photo-1581083988680-adc99ca5f8ea'  // Fresh local ingredients table
    ],
    gallery: [
      'photo-1504674900247-0877df9cc836', // Plated steak with sauce
      'photo-1565299624946-b28f40a0ae38', // Artisan wood-fired pizza
      'photo-1482049016688-2d3e1b311543', // Fresh healthy salad bowl
      'photo-1540189549336-e6e99c3679fe', // Gourmet pasta dish
      'photo-1567620905732-2d1ec7ab7445', // Stack of delicious pancakes
      'photo-1555939594-58d7cb561ad1', // Grilled skewers barbecue
      'photo-1484723091739-30a097e8f929', // Premium french toast with berries
      'photo-1473093295043-cdd812d0e601', // Mediterranean pasta salad
      'photo-1546069901-ba9599a7e63c', // Balanced salmon lunch bowl
      'photo-1506084868230-bb9d95c24759'  // Healthy oatmeal dessert
    ],
    services: [
      'photo-1511018556340-d16986a1c194', // Private catering event
      'photo-1537047902294-62a40c20a6ae', // Waiter pouring wine
      'photo-1556742049-0cfed4f6a45d', // Contactless payment checkout
      'photo-1498837167922-ddd27525d352', // Healthy delivery container
      'photo-1526367790999-0150786486a9', // Meal prep delivery box
      'photo-1544025162-d76694265947'  // BBQ catering spread
    ]
  },
  gym: {
    hero: [
      'photo-1517838277536-f5f99be501cd', // Modern gym weights row
      'photo-1534438327276-14e5300c3a48', // Athlete tying shoes in gym
      'photo-1541534741688-6078c6bfb5c5', // Person running on treadmill
      'photo-1518310383802-640c2de311b2', // Fitness class workout group
      'photo-1571019614242-c5c5dee9f50b'  // Abs workout routine
    ],
    about: [
      'photo-1571902943202-507ec2618e8f', // Gym trainers team
      'photo-1594381898411-846e7d193883', // Personal trainer coaching client
      'photo-1548690312-e3b507d8c110', // Fitness instructor portrait
      'photo-1570778003702-1210344ebd55', // Welcoming gym reception desk
      'photo-1599447421416-3414500d18a5'  // Gym community high-five
    ],
    gallery: [
      'photo-1584735935682-2f2b69dff9d2', // Dumbbells rack close-up
      'photo-1517838277536-f5f99be501cd', // Heavy lifting barbell bar
      'photo-1581009146145-b5ef050c2e1e', // Person doing kettlebell swing
      'photo-1599058917212-d750089bc07e', // High intensity training jump box
      'photo-1518622358385-8ea7d0794bf6', // Yoga stretch pose
      'photo-1574680096145-d05b474e2155', // Modern cardio equipment row
      'photo-1558017487-06bf9f82613a', // Rope battle workout session
      'photo-1598971639058-fab3c3109a00', // Running track athletic legs
      'photo-1538805060514-97d9cc17730c', // Athletic running outdoors
      'photo-1506126613408-eca07ce68773'  // Calm meditation posture
    ],
    services: [
      'photo-1522898467493-49726bf28798', // One-on-one personal training
      'photo-1518611012118-696072aa579a', // Aerobic group dance class
      'photo-1544367567-0f2fcb009e0b', // Professional yoga instruction
      'photo-1548690312-e3b507d8c110', // Custom diet plan consultation
      'photo-1517838277536-f5f99be501cd', // Open gym access floor
      'photo-1605296867304-46d5465a25f1'  // Muscle recovery massage
    ]
  },
  hospital: {
    hero: [
      'photo-1519494026892-80bbd2d6fd0d', // Hospital lobby building exterior
      'photo-1584515901387-a7c11b26958a', // Caring doctor holding hands
      'photo-1516549655169-df83a0774514', // Medical staff corridor walking
      'photo-1538108149393-fdfd81215362', // Patient room with modern bed
      'photo-1586773860418-d37222d8fce3'  // Modern clinic building entry
    ],
    about: [
      'photo-1559839734-2b71ea197ec2', // Team of medical specialists smiling
      'photo-1537368910025-700350fe46c7', // Professional surgeon doctor headshot
      'photo-1576091160550-2173dba999ef', // Nurse taking blood pressure test
      'photo-1579684389782-64d84b5e901a', // Doctor explaining prescription report
      'photo-1622253692010-333f2da6031d'  // Female physician with stethoscope
    ],
    gallery: [
      'photo-1516549655169-df83a0774514', // Healthcare professional checking chart
      'photo-1579156223622-c34b3e8fb53d', // Patient doing physical therapy
      'photo-1530026405186-ed1ea0ac7a63', // Smiling senior patient checkup
      'photo-1581594693702-fbdc51b2763b', // Modern laboratory research microscope
      'photo-1582718569302-143ac0f5afdf', // Patient recovery bed and monitor
      'photo-1584308666744-24d5c474f2e0', // High-tech MRI scanning equipment
      'photo-1579684389782-64d84b5e901a', // Doctor discussing scan results
      'photo-1629909613654-28e377c37b09', // Medical researchers working in lab
      'photo-1631815589968-fdb09a223b1e', // Pediatrician checking child heart
      'photo-1551601651-2a8555f1a136'  // Advanced robotic surgery system
    ],
    services: [
      'photo-1583324113626-70df0f4deaab', // 24/7 emergency response vehicle
      'photo-1579684389782-64d84b5e901a', // Diagnostic imaging consultation
      'photo-1576091160550-2173dba999ef', // Pediatrics family healthcare
      'photo-1504813184591-01555615e722', // Outpatient surgery preparation
      'photo-1579156223622-c34b3e8fb53d', // Specialized rehabilitation center
      'photo-1551076805-e1869f363f9b'  // Professional nursing care ward
    ]
  },
  travel: {
    hero: [
      'photo-1469854523086-cc02fe5d8800', // Roadtrip landscape with orange jeep
      'photo-1507525428034-b723cf961d3e', // Pristine tropical beach sunset
      'photo-1488646953014-85cb44e25828', // Traveler planning route on world map
      'photo-1476514525535-07fb3b4ae5f1', // Boat sailing down scenic river
      'photo-1501785888041-af3ef285b470'  // Scenic lake and mountain range
    ],
    about: [
      'photo-1527631746610-bca00a040d60', // Couple hiking in scenic national park
      'photo-1539635278303-d4002c07eae3', // Friends taking photo in old city
      'photo-1473186578172-c141e6798cf4', // Travel guide leading walking tour
      'photo-1502602898657-3e91760cbb34', // Streets of Paris afternoon stroll
      'photo-1516483638261-f4dbaf036963'  // Coastal Italian village Amalfi
    ],
    gallery: [
      'photo-1507525428034-b723cf961d3e', // Turquoise ocean water beach
      'photo-1528127269322-539801943592', // Majestic temple in Kyoto Japan
      'photo-1472214222541-d510753a4907', // Beautiful green hot air balloons
      'photo-1519046904884-53103b34b206', // Relaxing beach lounge chairs
      'photo-1530789253388-582c481c54b0', // Hiking trail panoramic view
      'photo-1502602898657-3e91760cbb34', // Historic European cathedral arch
      'photo-1464822759023-fed622ff2c3b', // Snow-capped mountain peak range
      'photo-1533105079780-92b9be482077', // Historic Santorini blue domes
      'photo-1513694203232-719a280e022f', // Quiet desert dunes camel caravan
      'photo-1501854140801-50d01698950b'  // Lush green forest waterfall
    ],
    services: [
      'photo-1488646953014-85cb44e25828', // Custom tour itinerary planning
      'photo-1436491865332-7a61a109cc05', // Flight booking boarding pass
      'photo-1566073771259-6a8506099945', // Luxury hotel booking suite
      'photo-1517604931442-7e0c8ed2963c', // Adventure travel tour guide
      'photo-1544620347-c4fd4a3d5957', // Private transport shuttle bus
      'photo-1522881111357-a1bf2b0b7207'  // Travel insurance policy check
    ]
  },
  hotel: {
    hero: [
      'photo-1566073771259-6a8506099945', // Luxury boutique hotel facade
      'photo-1520250497591-112f2f40a3f4', // Resort swimming pool over ocean
      'photo-1582719478250-c89cae4dc85b', // Elegant hotel bedroom interior
      'photo-1540555700478-4be289fbecef', // Cozy hotel lobby lounge seating
      'photo-1571896349842-33c89424de2d'  // Infinity pool resort view
    ],
    about: [
      'photo-1556742049-0cfed4f6a45d', // Friendly receptionist checking in guests
      'photo-1560518883-ce09059eeffa', // Concierge smiling at hotel desk
      'photo-1520250497591-112f2f40a3f4', // Premium hospitality team portrait
      'photo-1584132967334-10e028bd69f7', // Clean hotel lobby service bell
      'photo-1590490360182-c33d57733427'  // Housekeeping staff making bed
    ],
    gallery: [
      'photo-1611891404996-30256009ac81', // Deluxe double bedroom layout
      'photo-1582719508461-905c673771fd', // Modern bathroom glass shower
      'photo-1544161515-4ab6ce6db874', // Relaxing spa hot stone massage
      'photo-1517248135467-4c7edcad34c4', // Hotel dining restaurant venue
      'photo-1582719478250-c89cae4dc85b', // Pillow detail on luxury bed
      'photo-1596598424175-19a1e49da7e1', // Ocean view balcony seating
      'photo-1578683010236-d716f9a3f461', // Hotel bar with premium drinks
      'photo-1520250497591-112f2f40a3f4', // Sundowners by the beach club
      'photo-1554009975-d74653b849f1', // Zen garden hotel courtyard
      'photo-1506126613408-eca07ce68773'  // Morning yoga on deck
    ],
    services: [
      'photo-1566073771259-6a8506099945', // Luxury accommodation suites
      'photo-1414235077428-338989a2e8c0', // Gourmet room service tray
      'photo-1544161515-4ab6ce6db874', // Premium wellness spa packages
      'photo-1436491865332-7a61a109cc05', // Airport shuttle transfers
      'photo-1526367790999-0150786486a9', // Express dry cleaning laundry
      'photo-1515263487990-61b07816b324'  // Private beach access sunbeds
    ]
  },
  coffee_shop: {
    hero: [
      'photo-1501339847302-ac426a4a7cbb', // Hip modern coffee shop bar
      'photo-1495474472287-4d71bcdd2085', // Fresh pour-over coffee prep
      'photo-1447933601403-0c6688de566e', // Barista pouring latte art swan
      'photo-1554118811-1e0d58224f24', // Cozy cafe interior wooden tables
      'photo-1507133750040-4a8f57021571'  // Espresso machine brewing espresso
    ],
    about: [
      'photo-1577219491135-ce391730fb2c', // Barista smiling in apron
      'photo-1600565193348-f74bd3c7ccdf', // Coffee roasting staff team
      'photo-1511920170033-f8396924c348', // Friends chatting over coffee
      'photo-1498804103079-a6351b050096', // Cozy reading spot with coffee
      'photo-1485518224147-d264b7e9e296'  // Coffee beans sorting process
    ],
    gallery: [
      'photo-1541167760496-1628856ab772', // Flat white in ceramic cup
      'photo-1514432324607-a09d9b4aefdd', // Chemex coffee brewer close-up
      'photo-1509042239860-f550ce710b93', // Ice latte glass with milk swirl
      'photo-1515694346937-94d85e41e6f0', // Freshly baked butter croissant
      'photo-1501339847302-ac426a4a7cbb', // Espresso beans bag showcase
      'photo-1495474472287-4d71bcdd2085', // Coffee grinder ground beans
      'photo-1517248135467-4c7edcad34c4', // Cafe window bar seating
      'photo-1579697096985-41ff147097f2', // Slice of chocolate cake plate
      'photo-1511920170033-f8396924c348', // Outdoor patio cafe dining
      'photo-1497515114629-f71d768fd07c'  // Coffee cup mock-up work setup
    ],
    services: [
      'photo-1501339847302-ac426a4a7cbb', // Specialty espresso bar drinks
      'photo-1495474472287-4d71bcdd2085', // Hand-brewed single origin filter
      'photo-1515694346937-94d85e41e6f0', // Fresh daily artisan pastries
      'photo-1485518224147-d264b7e9e296', // Micro-lot coffee beans retail
      'photo-1556742049-0cfed4f6a45d', // Workspace high speed wifi access
      'photo-1511018556340-d16986a1c194'  // Cafe space event hosting
    ]
  },
  bakery: {
    hero: [
      'photo-1509440159596-0249088772ff', // Fresh sourdough bread loaves
      'photo-1549931319-a545dcf3bc73', // Pastry chef rolling pastry dough
      'photo-1517433456452-f9633a875f6f', // Display case filled with cakes
      'photo-1555507036-ab1f4038808a', // Baker putting bread in oven
      'photo-1589367920969-ab8e050bbb04'  // Fresh croissants stack close-up
    ],
    about: [
      'photo-1577219491135-ce391730fb2c', // Smiling baker in flour apron
      'photo-1600565193348-f74bd3c7ccdf', // Bakery kitchen family workshop
      'photo-1556228720-195a672e8a03', // Friendly bakery storefront staff
      'photo-1509440159596-0249088772ff', // Hands kneading flour dough
      'photo-1549931319-a545dcf3bc73'  // Fresh ingredients on kitchen table
    ],
    gallery: [
      'photo-1555507036-ab1f4038808a', // Artisan sourdough loaf scoring
      'photo-1509440159596-0249088772ff', // Chocolate cookies cooling rack
      'photo-1517433456452-f9633a875f6f', // Glazed strawberry tart slice
      'photo-1589367920969-ab8e050bbb04', // Golden puff pastry croissants
      'photo-1509440159596-0249088772ff', // Flour dusted on wooden board
      'photo-1515694346937-94d85e41e6f0', // Cinnamon rolls baking pan
      'photo-1579697096985-41ff147097f2', // Beautiful wedding cake icing
      'photo-1567620905732-2d1ec7ab7445', // Gourmet muffins breakfast tray
      'photo-1549931319-a545dcf3bc73', // French baguettes in paper bag
      'photo-1484723091739-30a097e8f929'  // Berry pancakes maple syrup
    ],
    services: [
      'photo-1509440159596-0249088772ff', // Daily fresh bread baking
      'photo-1517433456452-f9633a875f6f', // Custom celebratory cakes
      'photo-1589367920969-ab8e050bbb04', // Morning breakfast catering
      'photo-1549931319-a545dcf3bc73', // Bread baking masterclass
      'photo-1556742049-0cfed4f6a45d', // Local bakery home delivery
      'photo-1511018556340-d16986a1c194'  // Wholesale pastry supply
    ]
  },
  real_estate: {
    hero: [
      'photo-1564013799919-ab600027ffc6', // Luxury modern mansion exterior
      'photo-1600585154340-be6161a56a0c', // Stunning contemporary house facade
      'photo-1600596542815-ffad4c1539a9', // Luxurious living room design
      'photo-1600607687939-ce8a6c25118c', // Backyard swimming pool villa
      'photo-1512917774080-9991f1c4c750'  // High-end residential penthouse
    ],
    about: [
      'photo-1560250097-0b93528c311a', // Real estate agent smiling portrait
      'photo-1573496359142-b8d87734a5a2', // Female broker consulting clients
      'photo-1556742049-0cfed4f6a45d', // Handing over house keys handshake
      'photo-1600585154526-990dced4db0d', // Real estate agency team office
      'photo-1600565193348-f74bd3c7ccdf'  // Architect and broker discussion
    ],
    gallery: [
      'photo-1600210492486-724fe5c67fb0', // Modern kitchen marble island
      'photo-1600566753190-17f0baa2a6c3', // Master bedroom luxury bedding
      'photo-1600585154340-be6161a56a0c', // House backyard patio dining
      'photo-1600596542815-ffad4c1539a9', // Bathroom vanity gold accents
      'photo-1600607687920-4e2a09cf159d', // Open plan dining room light
      'photo-1512917774080-9991f1c4c750', // Apartment balcony ocean view
      'photo-1600573472591-ee6b68d14c68', // Home office workspace desk
      'photo-1600607687939-ce8a6c25118c', // Evening villa pool illumination
      'photo-1600585154526-990dced4db0d', // Living room fireplace detail
      'photo-1513694203232-719a280e022f'  // Modern glass wall corridors
    ],
    services: [
      'photo-1564013799919-ab600027ffc6', // Residential property sales
      'photo-1600585154340-be6161a56a0c', // Commercial real estate leasing
      'photo-1573496359142-b8d87734a5a2', // Expert property valuation
      'photo-1600585154526-990dced4db0d', // Professional home staging
      'photo-1556742049-0cfed4f6a45d', // Virtual property tours setup
      'photo-1600565193348-f74bd3c7ccdf'  // Real estate legal counseling
    ]
  },
  portfolio: {
    hero: [
      'photo-1507238691740-187a5b1d37b8', // Minimalist designer workspace
      'photo-1522202176988-66273c2fd55f', // Designer looking at color swatches
      'photo-1542744094-3a31f103e35f', // Creative agency meeting board
      'photo-1498050108023-c5249f4df085', // Laptop showing wireframe designs
      'photo-1519389950473-47ba0277781c'  // Designer hand sketching UI layout
    ],
    about: [
      'photo-1534528741775-53994a69daeb', // Creative professional smiling headshot
      'photo-1507003211169-0a1dd7228f2d', // Male designer portrait in studio
      'photo-1573496359142-b8d87734a5a2', // Female consultant greeting portrait
      'photo-1539571696357-5a69c17a67c6', // Freelancer working in coffee shop
      'photo-152202176988-66273c2fd55f'  // Collaboration brainstorm sketch
    ],
    gallery: [
      'photo-1507238691740-187a5b1d37b8', // Clean mockup workspace laptop
      'photo-1498050108023-c5249f4df085', // Smartphone interface mockup design
      'photo-1542744094-3a31f103e35f', // Brand identity typography booklet
      'photo-1519389950473-47ba0277781c', // Wireframe sketching notebook layout
      'photo-1522202176988-66273c2fd55f', // Color palette cards moodboard
      'photo-1531403009284-440f080d1e12', // Dashboard UI design on monitor
      'photo-1541462608141-ad4979e408c9', // Premium packaging box design
      'photo-1507238691740-187a5b1d37b8', // Graphic design tablet stylus pen
      'photo-1531403009284-440f080d1e12', // Mobile application screens design
      'photo-1486312338219-ce68d2c6f44d'  // Editorial magazine grid mockup
    ],
    services: [
      'photo-1507238691740-187a5b1d37b8', // Custom UI/UX design wireframes
      'photo-1522202176988-66273c2fd55f', // Strategic brand identity guidelines
      'photo-1498050108023-c5249f4df085', // Responsive web app development
      'photo-1542744094-3a31f103e35f', // Mobile app product design
      'photo-1519389950473-47ba0277781c', // Creative copywriting content strategy
      'photo-1531403009284-440f080d1e12'  // SEO and digital marketing campaigns
    ]
  },
  software: {
    hero: [
      'photo-1498050108023-c5249f4df085', // Tech developer programming at night
      'photo-1519389950473-47ba0277781c', // Modern software development team room
      'photo-1461749280684-dccba630e2f6', // Code editor on dual screens
      'photo-1504639725590-34d0984388bd', // Server room computer networking blue light
      'photo-1526374965328-7f61d4dc18c5'  // Abstract cybersecurity lock graphics
    ],
    about: [
      'photo-1531403009284-440f080d1e12', // Scrum board tech standup meeting
      'photo-1600267175161-cfaa727b4a68', // Software developer explaining dashboard
      'photo-152202176988-66273c2fd55f', // Coding pair programming setup
      'photo-1519389950473-47ba0277781c', // Modern tech workspace desk plants
      'photo-1600585154340-be6161a56a0c'  // Software quality assurance review
    ],
    gallery: [
      'photo-1461749280684-dccba630e2f6', // Programming javascript html block
      'photo-1526374965328-7f61d4dc18c5', // Abstract lines data stream matrix
      'photo-1519389950473-47ba0277781c', // Tech keyboard mouse code closeup
      'photo-1504639725590-34d0984388bd', // Server racks status indicator lights
      'photo-1531403009284-440f080d1e12', // UI designs on wide computer monitor
      'photo-1542744094-3a31f103e35f', // Web analytics chart graphs line
      'photo-1498050108023-c5249f4df085', // Tablet displaying database tables
      'photo-1526374965328-7f61d4dc18c5', // Digital secure access login screen
      'photo-1504639725590-34d0984388bd', // System administrator configuring network
      'photo-1486312338219-ce68d2c6f44d'  // AI neural network abstract visual
    ],
    services: [
      'photo-1498050108023-c5249f4df085', // Custom enterprise web software
      'photo-1526374965328-7f61d4dc18c5', // Cybersecurity compliance audit
      'photo-1461749280684-dccba630e2f6', // Cloud migration AWS hosting
      'photo-1504639725590-34d0984388bd', // Database schema architecture design
      'photo-1519389950473-47ba0277781c', // Tech support 24/7 SLA helpline
      'photo-1531403009284-440f080d1e12'  // AI API integration developer tools
    ]
  },
  fashion: {
    hero: [
      'photo-1483985988355-763728e1935b', // Shopping bags high street fashion
      'photo-1490481651871-ab68de25d43d', // Elegant models in designer clothing
      'photo-1496747611176-843222e1e57c', // Fashion show runway spotlights model
      'photo-1485968579580-b6d095142e6e', // Chic minimalist wardrobe setup
      'photo-1492707892479-7bc8d5a4ee93'  // Beauty cosmetics makeup flatlay
    ],
    about: [
      'photo-1534528741775-53994a69daeb', // Fashion stylist checking outfit model
      'photo-1507003211169-0a1dd7228f2d', // Designer drawing sketches in studio
      'photo-152202176988-66273c2fd55f', // Fabric swatches patterns discussion
      'photo-1539571696357-5a69c17a67c6', // Fashion blogger shooting street style
      'photo-1485968579580-b6d095142e6e'  // Premium apparel tailoring process
    ],
    gallery: [
      'photo-1490481651871-ab68de25d43d', // Summer dress elegant fashion model
      'photo-1509631179647-0177331693ae', // Close-up detail leather jacket outfit
      'photo-1496747611176-843222e1e57c', // Sunglasses accessory luxury fashion
      'photo-1483985988355-763728e1935b', // Designer heels shoes display rack
      'photo-1492707892479-7bc8d5a4ee93', // Jewelry gold necklaces rings setup
      'photo-1485968579580-b6d095142e6e', // Classic denim jacket detail closeup
      'photo-1539571696357-5a69c17a67c6', // Casual sneakers street style walking
      'photo-1490481651871-ab68de25d43d', // Knitwear autumn coats fashion style
      'photo-1509631179647-0177331693ae', // Designer luxury leather bag showcase
      'photo-1496747611176-843222e1e57c'  // Modern trendy watch wrist pose
    ],
    services: [
      'photo-1483985988355-763728e1935b', // Personal stylist outfit consultation
      'photo-1490481651871-ab68de25d43d', // Custom clothing tailoring sizing
      'photo-1496747611176-843222e1e57c', // Luxury private boutique access
      'photo-1485968579580-b6d095142e6e', // Capsule wardrobe styling plan
      'photo-1492707892479-7bc8d5a4ee93', // Premium bridal couture fitting
      'photo-1534528741775-53994a69daeb'  // Fashion photoshoot styling direction
    ]
  },
  photography: {
    hero: [
      'photo-1493863641943-9b68992a8d07', // Camera lens sunset reflection landscape
      'photo-1453006990391-7f41e0574289', // Professional DSLR camera on tripod
      'photo-1488646953014-85cb44e25828', // Traveler photographing mountain range
      'photo-1516035069371-29a1b244cc32', // Studio flashes lighting setup room
      'photo-1500485035595-cbe6f645feb1'  // Photographer camera viewfinder view
    ],
    about: [
      'photo-1534528741775-53994a69daeb', // Portrait photographer smiling in studio
      'photo-1507003211169-0a1dd7228f2d', // Male artist holding camera smiling
      'photo-1573496359142-b8d87734a5a2', // Reviewing photos on camera screen
      'photo-1539571696357-5a69c17a67c6', // Shooting outdoor street portraits
      'photo-152202176988-66273c2fd55f'  // Photo editing workspace screen setup
    ],
    gallery: [
      'photo-1493863641943-9b68992a8d07', // Stunning sunset landscape horizon
      'photo-1534528741775-53994a69daeb', // Studio dramatic portrait lighting face
      'photo-1507003211169-0a1dd7228f2d', // Black and white architectural shadow
      'photo-1488646953014-85cb44e25828', // Action sports runner athletic shot
      'photo-1516035069371-29a1b244cc32', // Wildlife birds flying majestic sunset
      'photo-1500485035595-cbe6f645feb1', // Macro drops on green leaf details
      'photo-1453006990391-7f41e0574289', // Travel travel luggage destination map
      'photo-152202176988-66273c2fd55f', // Street neon lights reflection rain
      'photo-1539571696357-5a69c17a67c6', // Elegant wedding kiss couple portrait
      'photo-1516035069371-29a1b244cc32'  // Aerial drone ocean coastline waves
    ],
    services: [
      'photo-1534528741775-53994a69daeb', // Professional wedding portraiture packages
      'photo-1507003211169-0a1dd7228f2d', // Commercial product advertising shoot
      'photo-1516035069371-29a1b244cc32', // Architecture real estate photography
      'photo-1493863641943-9b68992a8d07', // Outdoor landscape travel photography
      'photo-152202176988-66273c2fd55f', // Advanced photo editing retouching
      'photo-1539571696357-5a69c17a67c6'  // Corporate events family portraiture
    ]
  },
  generic: {
    hero: [
      'photo-1557804506-669a67965ba0', // Generic startup team meeting office
      'photo-1486406146926-c627a92ad1ab', // Tall glass skyscraper building facade
      'photo-1507238691740-187a5b1d37b8', // Desk setup workspace laptop coffee
      'photo-152202176988-66273c2fd55f', // Colleagues collaborating brainstorm white
      'photo-1519389950473-47ba0277781c'  // Desk workspace keyboard notes
    ],
    about: [
      'photo-1573496359142-b8d87734a5a2', // Modern business executive headshot
      'photo-1560250097-0b93528c311a', // Team of professionals consulting
      'photo-1600565193348-f74bd3c7ccdf', // Active workshop office team
      'photo-1522202176988-66273c2fd55f', // Coffee break discussion smiling
      'photo-1556742049-0cfed4f6a45d'  // Customer service representative headset
    ],
    gallery: [
      'photo-1486406146926-c627a92ad1ab', // City high rise modern architecture
      'photo-1507238691740-187a5b1d37b8', // Tech office equipment keyboard mouse
      'photo-1542744094-3a31f103e35f', // Statistics diagram analytical report
      'photo-1519389950473-47ba0277781c', // Notebook planning daily schedule desk
      'photo-152202176988-66273c2fd55f', // Color swatch cards designer moodboard
      'photo-1531403009284-440f080d1e12', // Digital monitor wireframe UI screen
      'photo-1541462608141-ad4979e408c9', // Premium parcel delivery package boxes
      'photo-1507238691740-187a5b1d37b8', // Graphic artist stylus pen workspace
      'photo-1531403009284-440f080d1e12', // Analytics line graph statistics screen
      'photo-1486312338219-ce68d2c6f44d'  // Digital network server blue grid
    ],
    services: [
      'photo-1557804506-669a67965ba0', // Professional consulting advisory
      'photo-152202176988-66273c2fd55f', // Custom strategy blueprint planning
      'photo-1486406146926-c627a92ad1ab', // Premium operations management support
      'photo-1507238691740-187a5b1d37b8', // Modern tech integration consulting
      'photo-1556742049-0cfed4f6a45d', // Round the clock support service desk
      'photo-1542744094-3a31f103e35f'  // Scalable business growth audit
    ]
  }
};

/**
 * Returns a deterministic image URL based on a project seed (such as projectId)
 * to ensure that different websites use different, curated royalty-free images.
 */
export function getImagesForCategory(category: string, seed: string): BusinessCategoryImages {
  // Normalize category key
  const normalized = category.toLowerCase().replace(/[\s-_]/g, '_');
  const pool = IMAGE_POOL[normalized] || IMAGE_POOL.generic;

  // Simple hashing function to generate unique but deterministic indexes based on seed
  const hashString = (str: string, offset: number): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash + offset);
  };

  const mapToUnsplashUrls = (photoIds: string[]): string[] => {
    return photoIds.map(id => `https://images.unsplash.com/${id}?w=800&auto=format&fit=crop&q=80`);
  };

  // Select images deterministically
  const pickImages = (list: string[], count: number, offset: number): string[] => {
    const result: string[] = [];
    const available = [...list];
    for (let i = 0; i < count; i++) {
      if (available.length === 0) break;
      const index = hashString(seed, offset + i) % available.length;
      result.push(available.splice(index, 1)[0]);
    }
    return mapToUnsplashUrls(result);
  };

  return {
    hero: pickImages(pool.hero, pool.hero.length, 100),
    about: pickImages(pool.about, pool.about.length, 200),
    gallery: pickImages(pool.gallery, pool.gallery.length, 300),
    services: pickImages(pool.services, pool.services.length, 400)
  };
}

/**
 * Matches business category keywords against a user's prompt text
 */
export function detectCategoryFromPrompt(prompt: string): string {
  const text = prompt.toLowerCase();
  
  if (text.includes('restaurant') || text.includes('food') || text.includes('bistro') || text.includes('dine') || text.includes('dining') || text.includes('cafe')) {
    return 'restaurant';
  }
  if (text.includes('coffee') || text.includes('roastery') || text.includes('cafe') || text.includes('espresso') || text.includes('barista')) {
    return 'coffee_shop';
  }
  if (text.includes('bakery') || text.includes('bread') || text.includes('pastry') || text.includes('cake') || text.includes('baking')) {
    return 'bakery';
  }
  if (text.includes('gym') || text.includes('fitness') || text.includes('workout') || text.includes('training') || text.includes('athletics')) {
    return 'gym';
  }
  if (text.includes('hospital') || text.includes('medical') || text.includes('clinic') || text.includes('doctor') || text.includes('dental') || text.includes('healthcare') || text.includes('physician')) {
    return 'hospital';
  }
  if (text.includes('travel') || text.includes('trip') || text.includes('tour') || text.includes('adventure') || text.includes('explore')) {
    return 'travel';
  }
  if (text.includes('hotel') || text.includes('resort') || text.includes('stay') || text.includes('inn') || text.includes('motel') || text.includes('lodging')) {
    return 'hotel';
  }
  if (text.includes('real estate') || text.includes('house') || text.includes('mansion') || text.includes('property') || text.includes('broker') || text.includes('apartment') || text.includes('realty')) {
    return 'real_estate';
  }
  if (text.includes('portfolio') || text.includes('resume') || text.includes('freelancer') || text.includes('designer') || text.includes('cv')) {
    return 'portfolio';
  }
  if (text.includes('software') || text.includes('app') || text.includes('tech') || text.includes('company') || text.includes('code') || text.includes('programming') || text.includes('saas') || text.includes('it company')) {
    return 'software';
  }
  if (text.includes('fashion') || text.includes('clothing') || text.includes('apparel') || text.includes('boutique') || text.includes('shop') || text.includes('designer wear')) {
    return 'fashion';
  }
  if (text.includes('photography') || text.includes('photo') || text.includes('camera') || text.includes('photoshoot') || text.includes('photographer')) {
    return 'photography';
  }

  return 'generic';
}
