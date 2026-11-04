import type { Locale } from "@/lib/routes";

type T = Record<Locale, string>;

export const ui = {
  nav: {
    products: { nl: "Producten", en: "Products" },
    projects: { nl: "Projecten", en: "Projects" },
    shop: { nl: "Shop", en: "Shop" },
    about: { nl: "Over", en: "About" },
    technology: { nl: "Technologie", en: "Technology" },
    team: { nl: "Team", en: "Team" },
    careers: { nl: "Vacatures", en: "Careers" },
    news: { nl: "Nieuws", en: "News" },
    contact: { nl: "Contact", en: "Contact" },
    dashboard: { nl: "Dashboard", en: "Dashboard" },
    menu: { nl: "Menu", en: "Menu" },
    close: { nl: "Sluiten", en: "Close" },
  },
  readMore: { nl: "Lees meer", en: "Read more" },
  allProjects: { nl: "Bekijk de projecten", en: "View the projects" },
  contactUs: { nl: "Contact", en: "Contact" },
  partners: { nl: "Onze partners", en: "Our partners" },
  collaborate: { nl: "Samenwerken?", en: "Want to work together?" },
  collaborateText: { nl: "We kijken graag wat we voor je kunnen betekenen!", en: "We would love to see what we can do for you!" },
  back: { nl: "Terug", en: "Back" },
  footer: {
    products: { nl: "Onze producten", en: "Our products" },
    contact: { nl: "Contact", en: "Contact" },
    about: { nl: "Over Plant-e", en: "About Plant-e" },
    form: { nl: "Contactformulier", en: "Contact form" },
    newsletter: { nl: "Nieuwsbrief", en: "Newsletter" },
    route: { nl: "Routebeschrijving", en: "Directions" },
    webshop: { nl: "Webshop", en: "Webshop" },
    privacy: { nl: "Privacy statement", en: "Privacy statement" },
    cookies: { nl: "Cookieverklaring", en: "Cookie statement" },
    shipping: { nl: "Bezorg & retourvoorwaarden", en: "Shipping & returns" },
    terms: { nl: "Algemene voorwaarden", en: "Terms and conditions" },
    eic: { nl: "Mede mogelijk gemaakt door de European Innovation Council", en: "Supported by the European Innovation Council" },
  },
  langNote: { nl: "Dit bericht is beschikbaar in het Engels.", en: "This article is available in Dutch." },
  cookie: {
    text: {
      nl: "Deze site gebruikt cookies. Hierbij wordt geen persoonlijke data verzameld en IP-gegevens worden geanonimiseerd. De cookies worden gebruikt voor het technisch functioneren van de website en het verzamelen van anonieme website statistieken.",
      en: "This site uses cookies. No personal data is collected and IP addresses are anonymised. Cookies are used for the technical functioning of the website and to collect anonymous website statistics.",
    },
    accept: { nl: "Accepteren", en: "Accept" },
    decline: { nl: "Alleen functioneel", en: "Functional only" },
    more: { nl: "Cookieverklaring", en: "Cookie statement" },
  },
  forms: {
    name: { nl: "Naam", en: "Name" },
    email: { nl: "E-mailadres", en: "Email address" },
    phone: { nl: "Telefoonnummer (incl. landcode)", en: "Phone number (incl. country code)" },
    company: { nl: "Bedrijfsnaam", en: "Company name" },
    message: { nl: "Jouw bericht", en: "Your message" },
    send: { nl: "Versturen", en: "Send" },
    sending: { nl: "Bezig met versturen...", en: "Sending..." },
    consent: {
      nl: "Ik ga ermee akkoord dat Plant-e contact met mij mag opnemen over relevante producten of diensten. Zie voor meer informatie ons privacy statement.",
      en: "By submitting this form, you agree that Plant-e may contact you regarding relevant products or services. For more information, see our privacy statement.",
    },
    thanks: { nl: "Bedankt! We nemen zo snel mogelijk contact met je op.", en: "Thank you! We will get back to you as soon as possible." },
    error: { nl: "Er ging iets mis. Probeer het opnieuw of mail naar office@plant-e.com.", en: "Something went wrong. Please try again or email office@plant-e.com." },
    required: { nl: "verplicht", en: "required" },
    downloadBrochure: { nl: "Download de brochure", en: "Download the brochure" },
    brochureThanks: { nl: "Bedankt voor je interesse. Je brochure staat klaar:", en: "Thank you for your interest. Your brochure is ready:" },
    subscribe: { nl: "Inschrijven", en: "Subscribe" },
    subscribed: { nl: "Je bent ingeschreven. Bevestig je inschrijving via de mail die je ontvangt.", en: "You are subscribed. Please confirm via the email you will receive." },
  },
  shop: {
    title: { nl: "De Plant-e winkel", en: "The Plant-e shop" },
    intro: {
      nl: "Wil jij ook plantenstroom opwekken? Haal met deze doe-het-zelf boxen de toekomst alvast in huis. Probeer het thuis, of kies voor een van de pakketten voor op werk of school.",
      en: "Want to generate plant power yourself? Bring the future home with these do-it-yourself boxes. Try it at home, or choose one of the packages for work or school.",
    },
    all: { nl: "Alle producten", en: "All products" },
    addToCart: { nl: "In winkelwagen", en: "Add to cart" },
    added: { nl: "Toegevoegd", en: "Added" },
    cart: { nl: "Winkelwagen", en: "Cart" },
    emptyCart: { nl: "Je winkelwagen is leeg.", en: "Your cart is empty." },
    continue: { nl: "Verder winkelen", en: "Continue shopping" },
    checkout: { nl: "Afrekenen", en: "Checkout" },
    subtotal: { nl: "Subtotaal", en: "Subtotal" },
    shippingCalc: { nl: "Verzendkosten worden berekend bij het afrekenen.", en: "Shipping is calculated at checkout." },
    pickupNote: {
      nl: "Je winkelwagen bevat een product dat alleen kan worden opgehaald bij ons kantoor in Renkum. We nemen na je bestelling contact op voor een afspraak.",
      en: "Your cart contains a product that can only be collected at our office in Renkum (NL). We will contact you after your order to make an appointment.",
    },
    pickupOnly: { nl: "Alleen ophalen in Renkum (NL)", en: "Collection only in Renkum (NL)" },
    inStock: { nl: "Op voorraad", en: "In stock" },
    outOfStock: { nl: "Niet op voorraad", en: "Out of stock" },
    backorder: { nl: "Op bestelling", en: "Available on order" },
    contactForStock: { nl: "Neem contact op voor de mogelijkheden", en: "Contact us for availability" },
    quantity: { nl: "Aantal", en: "Quantity" },
    remove: { nl: "Verwijderen", en: "Remove" },
    vat: { nl: "incl. btw", en: "incl. VAT" },
    thanksTitle: { nl: "Bedankt voor je bestelling!", en: "Thank you for your order!" },
    thanksText: {
      nl: "Je ontvangt een bevestiging per e-mail. Je bestelling wordt binnen een week verzonden, of we nemen contact op om een ophaalafspraak te maken.",
      en: "You will receive a confirmation by email. Your order ships within a week, or we will contact you to arrange collection.",
    },
    toHome: { nl: "Ga naar home", en: "Go to home" },
    categories: { nl: "Per categorie", en: "By category" },
    customTitle: { nl: "Jouw eigen project?", en: "Your own project?" },
    customText: {
      nl: "Ben je op zoek naar een samenwerking of specifieke installatie die hier niet bij staat? Wij doen veel maatwerk. Neem contact op voor de mogelijkheden.",
      en: "Looking for a collaboration or a specific installation that is not listed here? We do a lot of custom work. Get in touch to discuss the options.",
    },
    checkoutError: { nl: "Afrekenen is op dit moment niet gelukt. Probeer het later opnieuw.", en: "Checkout failed. Please try again later." },
  },
} as const;

export const shopCategoryText: Record<string, { title: T; text: T }> = {
  home: {
    title: { nl: "@Home", en: "@Home" },
    text: { nl: "Doe-het-zelf pakketten waarmee je thuis plantenstroom kunt opwekken.", en: "DIY kits to generate plant power at home." },
  },
  work: {
    title: { nl: "@Work", en: "@Work" },
    text: { nl: "Demonstratieve installaties. Of neem contact op voor projecten op maat.", en: "Demonstration installations. Or contact us for custom projects." },
  },
  school: {
    title: { nl: "@School", en: "@School" },
    text: { nl: "Lespakketten en educatieve installaties over onze technologie.", en: "Teaching kits and educational installations about our technology." },
  },
};

export const home = {
  title: { nl: "Autonome sensoren voor natuur, land- en tuinbouw", en: "Autonomous sensors for nature, agriculture and horticulture" },
  subtitle: { nl: "SensorSticks op basis van plantenstroom", en: "SensorSticks powered by plant electricity" },
  metaDescription: {
    nl: "Klimaatpositieve energie uit de natuur. Elektriciteit opgewekt met planten voor sensoren en verlichting.",
    en: "Climate-positive energy from nature. Electricity generated by living plants for sensors and lighting.",
  },
  techTitle: { nl: "Onze gepatenteerde technologie", en: "Our patented technology" },
  techText: {
    nl: "Plant-e benut de natuurlijke processen die plaatsvinden rondom de plant om elektriciteit op te wekken.",
    en: "Plant-e harnesses the natural processes around a plant's roots to generate electricity.",
  },
  techCta: { nl: "Lees de uitleg", en: "Read the explanation" },
  projectsTitle: { nl: "Projecten", en: "Projects" },
  projectsText: {
    nl: "Onze volledige projecten omvatten meerdere Plant-e systemen die geïntegreerd zijn in diverse landschappen. Dit omvat uitgebreide installaties in parken en buitengebieden, evenals losstaande systemen, zoals in plantenbakken of boombakken.",
    en: "Our full projects comprise multiple Plant-e systems integrated into a variety of landscapes. These range from extensive installations in parks and rural areas to stand-alone systems, such as in planters or tree pits.",
  },
  sensors: {
    groundwater: {
      label: { nl: "Grondwaterstand", en: "Groundwater level" },
      image: "/media/2025/03/cropped-IMG_20250320_105825-scaled-1.jpg",
      text: {
        nl: "De waterstand SensorStick is een volledig geïntegreerde, zelfvoorzienende monitoringsoplossing. Hij combineert een stroombron op basis van levende planten, accurate sensoren en datatransmissie via satelliet. Zo verzamelt en verstuurt hij altijd en overal data, zonder batterijen te vervangen en zonder lokaal datanetwerk.",
        en: "The water level SensorStick is a fully integrated, self-sufficient monitoring solution. It combines a power source based on living plants, accurate sensors and satellite data transmission. It collects and sends data anytime, anywhere, without replacing batteries and without a local data network.",
      },
    },
    soil: {
      label: { nl: "Bodemvocht", en: "Soil moisture" },
      image: "/media/2023/12/cropped-image.png",
      text: {
        nl: "Gezond gras, gezonde beplanting en sterke boomgroei zijn afhankelijk van zorgvuldig waterbeheer. De Bodemvocht SensorStick levert continue, realtime bodemvochtgegevens voor golfbanen, boomkwekerijen, stedelijk groen en landbouw, waardoor slimmer en efficiënter irrigeren mogelijk wordt.",
        en: "Healthy turf, healthy planting and strong tree growth depend on careful water management. The Soil Moisture SensorStick delivers continuous, real-time soil moisture data for golf courses, tree nurseries, urban green spaces and agriculture, enabling smarter and more efficient irrigation.",
      },
    },
    waterquality: {
      label: { nl: "Waterkwaliteit", en: "Water quality" },
      image: "/media/2026/01/cropped-IMG_20251007_141510-scaled-1.jpg",
      text: {
        nl: "De Waterkwaliteit SensorStick is geschikt voor een fijnmazig meetnet rondom kassen en landbouwpercelen. Hij meet EC en temperatuur en werkt zo als vroeg detectiesysteem voor veranderingen in waterkwaliteit, waar direct op gestuurd kan worden.",
        en: "The Water Quality SensorStick is designed for a dense monitoring network around greenhouses and farmland. It measures EC and temperature, acting as an early warning system for changes in water quality that can be acted on immediately.",
      },
    },
  },
};

export type Spec = { label: T; values: T[] };
export type SensorPage = {
  title: T; metaDescription: T; intro: T[]; heroImage: string; applications: T[]; dashboardImage: string;
  specs: { title: T; rows: Spec[] }[]; useCases: { image: string; title: T; items?: T[] }[];
  brochure: { pdf: string; label: T };
};

const L = (nl: string, en?: string): T => ({ nl, en: en ?? nl });

const generalTitle = L("Algemene informatie", "General information");
const transTitle = L("Datatransmissie", "Data transmission");
const lifetime: Spec = { label: L("Levensduur", "Lifetime"), values: [L(">50 jaar", ">50 years")] };
const power: Spec = { label: L("Stroombron", "Power source"), values: [L("Op plantenbasis met batterijback-up", "Plant-based with battery back-up")] };

export const sensorPages: Record<"groundwater" | "soil" | "waterquality", SensorPage> = {
  groundwater: {
    title: L("Grondwaterstand SensorStick", "Groundwater Level SensorStick"),
    metaDescription: L(
      "Zelfvoorzienende grondwaterstandsensor op plantenstroom met datatransmissie via satelliet. Geen batterijen vervangen, geen lokaal netwerk nodig.",
      "Self-sufficient groundwater level sensor powered by plants, with satellite data transmission. No battery replacements, no local network needed.",
    ),
    heroImage: "/media/2026/05/cropped-SensorStick-3-scaled-1.jpg",
    dashboardImage: "/media/2026/05/dashboardgenerated.png",
    intro: [
      L(
        "De SensorStick is een volledig geïntegreerde, zelfvoorzienende monitoringsoplossing die een plantaardige energiebron, geavanceerde sensoren en satellietdatatransmissie combineert in één compact systeem. Ontwikkeld door Plant-e, wekt de SensorStick elektriciteit rechtstreeks op uit plantenwortels en bodemmicro-organismen in veengebieden. Deze innovatieve technologie elimineert de noodzaak van traditionele batterijen en biedt een onderhoudsvriendelijk, milieuvriendelijk alternatief dat zowel operationele kosten als ecologische impact vermindert.",
        "The SensorStick is a fully integrated, self-sufficient monitoring solution that combines a plant-based power source, advanced sensors and satellite data transmission in one compact system. Developed by Plant-e, the SensorStick generates electricity directly from plant roots and soil micro-organisms in peatlands. This innovative technology eliminates the need for traditional batteries and offers a low-maintenance, environmentally friendly alternative that reduces both operating costs and ecological impact.",
      ),
      L(
        "Ontworpen voor snelle en eenvoudige installatie in veengebieden en wetlands, maakt de SensorStick gebruik van gepatenteerde technologie om high-definition metingen op afstand te leveren zonder frequente bezoeken op locatie. Het systeem omvat een waterniveausensor en een bodemtemperatuursensor, met betrouwbare satellietconnectiviteit voor naadloze datatransmissie, zelfs op de meest afgelegen en uitdagende locaties.",
        "Designed for quick and easy installation in peatlands and wetlands, the SensorStick uses patented technology to deliver high-definition remote measurements without frequent site visits. The system includes a water level sensor and a soil temperature sensor, with reliable satellite connectivity for seamless data transmission, even in the most remote and challenging locations.",
      ),
      L(
        "Nauwkeurige realtime data is essentieel voor het beschermen en herstellen van wetlands en veengebieden. Deze ecosystemen spelen een cruciale rol in koolstofopslag, behoud van biodiversiteit en waterregulatie. Door continu waterniveaus en temperatuur te monitoren, stelt de SensorStick terreinbeheerders en natuurbeschermingsteams in staat snel te reageren op veranderingen, waterbeheer te optimaliseren en degradatie te voorkomen.",
        "Accurate real-time data is essential for protecting and restoring wetlands and peatlands. These ecosystems play a crucial role in carbon storage, biodiversity conservation and water regulation. By continuously monitoring water levels and temperature, the SensorStick enables land managers and conservation teams to respond quickly to change, optimise water management and prevent degradation.",
      ),
      L(
        "De functionaliteit op afstand vermindert aanzienlijk de noodzaak van veldwerk, verlaagt onderhoudskosten en minimaliseert verstoring van kwetsbare omgevingen. Dit maakt de SensorStick niet alleen een technologische innovatie, maar ook een praktische en duurzame oplossing voor langetermijnbeheer van veengebieden en wetlands.",
        "Remote operation significantly reduces the need for fieldwork, lowers maintenance costs and minimises disturbance of fragile environments. This makes the SensorStick not only a technological innovation, but also a practical and sustainable solution for the long-term management of peatlands and wetlands.",
      ),
    ],
    applications: [L("Veengebieden", "Peatlands"), L("Mangrovebossen", "Mangrove forests"), L("Regenwouden", "Rainforests"), L("Rivierbeddingen", "Riverbeds"), L("Ondiepe bekkens", "Shallow basins")],
    specs: [
      { title: generalTitle, rows: [
        { label: L("Beschikbare data", "Available data"), values: [L("Waterstand", "Water level"), L("Bodemtemperatuur", "Soil temperature"), L("Status stroombron", "Power source status")] },
        lifetime, power,
        { label: L("Afmetingen (cm)", "Dimensions (cm)"), values: [L("⌀ 8,5 x 100", "⌀ 8.5 x 100")] },
      ] },
      { title: transTitle, rows: [
        { label: L("Protocol", "Protocol"), values: [L("LoRa"), L("Satelliet", "Satellite")] },
        { label: L("Transmissiefrequentie", "Transmission frequency"), values: [L("24 uur", "24 hours")] },
        { label: L("Formaat", "Format"), values: [L("CSV/Excel")] },
      ] },
      { title: L("Waterstandmetingen", "Water level measurements"), rows: [
        { label: L("Meetfrequentie", "Measurement frequency"), values: [L("Dagelijks", "Daily"), L("Wekelijks", "Weekly"), L("Maandelijks", "Monthly")] },
        { label: L("Precisie", "Precision"), values: [L("± 1 cm"), L("± 0,1°C", "± 0.1°C")] },
        { label: L("Meettype", "Measurement type"), values: [L("Differentiële druk", "Differential pressure")] },
      ] },
    ],
    useCases: [
      { image: "/media/2023/11/environment.png", title: L("Omgevingsmonitoring", "Environmental monitoring"), items: [L("Bodemvocht", "Soil moisture"), L("Temperatuur", "Temperature"), L("Regenmeter", "Rain gauge"), L("Luchtkwaliteit", "Air quality")] },
      { image: "/media/2023/11/rice-field.png", title: L("Rijstvelden", "Rice fields"), items: [L("Elektrische geleiding", "Electrical conductivity"), L("Waterniveau", "Water level")] },
      { image: "/media/2023/11/wet-land.png", title: L("Waterbeheer in wetlands", "Water management in wetlands"), items: [L("Temperatuur", "Temperature"), L("Waterkwaliteit", "Water quality"), L("Waterniveau", "Water level")] },
      { image: "/media/2023/11/rain-forest.png", title: L("Monitoring van het regenwoud op afstand", "Remote rainforest monitoring"), items: [L("Bodemvocht", "Soil moisture"), L("Temperatuur", "Temperature"), L("Waterniveau", "Water level")] },
    ],
    brochure: { pdf: "/media/2026/06/202605-Brochure-Water-level-SensorStick_digital.pdf", label: L("Grondwaterstand SensorStick", "Groundwater Level SensorStick") },
  },
  soil: {
    title: L("Bodemvocht SensorStick", "Soil Moisture SensorStick"),
    metaDescription: L(
      "Onderhoudsvrije bodemvochtsensor op plantenstroom voor golfbanen, boomkwekerijen, stedelijk groen en landbouw.",
      "Maintenance-free soil moisture sensor powered by plants, for golf courses, tree nurseries, urban green spaces and agriculture.",
    ),
    heroImage: "/media/2023/12/cropped-image-1-1.png",
    dashboardImage: "/media/2026/05/dashboardgenerated.png",
    intro: [
      L(
        "Ben je op zoek naar een betrouwbare bodemvochtsensor voor je golfbaan, stedelijk groen of gewas? Dan is de Bodemvocht SensorStick voor jou geschikt. Deze robuuste SensorStick is geschikt voor toepassing in zowel stedelijke als landelijke omgeving en kan goed tegen een stootje. Dankzij LoRa-connectiviteit worden gegevens automatisch verzonden naar je persoonlijke dashboard, uit te lezen vanaf je computer of de app op je telefoon. Hierdoor is monitoring op afstand van meerdere velden of kwekerijsecties mogelijk. Dit vermindert aanzienlijk de noodzaak van handmatige bodemcontroles, bespaart arbeidsuren en stelt personeel in staat zich te richten op gerichte interventies in plaats van routinematige inspecties.",
        "Looking for a reliable soil moisture sensor for your golf course, urban green space or crops? Then the Soil Moisture SensorStick is for you. This robust SensorStick works in both urban and rural environments and can take a knock. Thanks to LoRa connectivity, data is sent automatically to your personal dashboard, readable on your computer or via the app on your phone. This enables remote monitoring of multiple fields or nursery sections, significantly reducing the need for manual soil checks, saving labour hours and allowing staff to focus on targeted interventions instead of routine inspections.",
      ),
      L(
        "Installatie is eenvoudig te doen met een grondboor en eenmaal in de grond begint de SensorStick meteen met data verzamelen en versturen. Zo kun je snel weer verder met je kernactiviteiten.",
        "Installation is easy with a soil auger, and once in the ground the SensorStick immediately starts collecting and sending data, so you can quickly get back to your core activities.",
      ),
      L(
        "Op golfbanen helpt nauwkeurige bodemvochtmonitoring bij het behouden van een consistente grasmatkwaliteit op greens, fairways en roughs. Greenkeepers kunnen irrigatieschema's optimaliseren, droge plekken voorkomen, overbewatering verminderen en de speelkwaliteit verbeteren, terwijl tegelijkertijd het waterverbruik en de operationele kosten worden verlaagd.",
        "On golf courses, accurate soil moisture monitoring helps maintain consistent turf quality on greens, fairways and roughs. Greenkeepers can optimise irrigation schedules, prevent dry spots, reduce overwatering and improve playing quality, while lowering water use and operating costs at the same time.",
      ),
      L(
        "In boomkwekerijen is nauwkeurige vochtregeling essentieel voor gezonde wortelontwikkeling, uniforme groei en hoge plantkwaliteit. Met continue monitoring kunnen kwekerijbeheerders droogtestress voorkomen, waterverzadiging vermijden en optimale groeiomstandigheden creëren voor jonge bomen en struiken. Dit leidt tot sterkere planten, hogere overlevingspercentages en een verbeterde algehele productiviteit.",
        "In tree nurseries, precise moisture control is essential for healthy root development, uniform growth and high plant quality. With continuous monitoring, nursery managers can prevent drought stress, avoid waterlogging and create optimal growing conditions for young trees and shrubs. This leads to stronger plants, higher survival rates and better overall productivity.",
      ),
    ],
    applications: [L("Golfbanen", "Golf courses"), L("Landbouwvelden", "Agricultural fields"), L("Wijngaarden", "Vineyards"), L("Boomgaarden", "Orchards"), L("Parken en groene ruimtes", "Parks and green spaces")],
    specs: [
      { title: generalTitle, rows: [
        { label: L("Beschikbare data", "Available data"), values: [L("Bodemvochtigheid", "Soil moisture"), L("Status stroombron", "Power source status")] },
        lifetime, power,
        { label: L("Afmetingen (cm)", "Dimensions (cm)"), values: [L("⌀ 40 x 130")] },
      ] },
      { title: transTitle, rows: [
        { label: L("Protocol", "Protocol"), values: [L("LoRa")] },
        { label: L("Transmissiefrequentie", "Transmission frequency"), values: [L("Per uur", "Hourly")] },
        { label: L("Formaat", "Format"), values: [L("CSV/Excel")] },
      ] },
      { title: L("Bodemvochtmetingen", "Soil moisture measurements"), rows: [
        { label: L("Meetfrequentie", "Measurement frequency"), values: [L("Per uur", "Hourly")] },
        { label: L("Precisie", "Precision"), values: [L("± 0,05 m³/m³", "± 0.05 m³/m³")] },
        { label: L("Meettype", "Measurement type"), values: [L("Diëlektrische meting", "Dielectric measurement")] },
      ] },
    ],
    useCases: [
      { image: "/media/2025/03/soil-moisture-golf.png", title: L("Golfbanen", "Golf courses") },
      { image: "/media/2025/03/soil-moisture-agri.png", title: L("Landbouwvelden en wijngaarden", "Fields and vineyards") },
      { image: "/media/2025/03/soil-moisture-parken-en-groene-ruimtes.png", title: L("Parken en groene ruimtes", "Parks and green spaces") },
      { image: "/media/2025/03/soil-moisture-boomgaarden-1.png", title: L("Boomgaarden", "Orchards") },
    ],
    brochure: { pdf: "/media/2026/06/202605-Brochure-Soil-moisture-Sensors-for-ag-Portrait.pdf", label: L("Bodemvocht SensorStick", "Soil Moisture SensorStick") },
  },
  waterquality: {
    title: L("Waterkwaliteit SensorStick", "Water Quality SensorStick"),
    metaDescription: L(
      "De Plant-e SensorStick meet waterkwaliteit en temperatuur. De unieke Plant-e stroombron is ontworpen om meer dan 50 jaar mee te gaan.",
      "The Plant-e SensorStick measures water quality and temperature. The unique Plant-e power source is designed to last more than 50 years.",
    ),
    heroImage: "/media/2026/05/cropped-cropped-IMG_20251111_160707-scaled-1.jpg",
    dashboardImage: "/media/2026/05/cropped-dashboard.png",
    intro: [
      L(
        "Plant-e en partners werken samen aan onderhoudsvrije, door plantenenergie aangedreven sensoren voor continue realtime monitoring van oppervlaktewaterkwaliteit rond glastuinbouw- en landbouwgebieden. Door temperatuur en elektrische geleidbaarheid (EC) continu te meten, biedt de SensorStick betrouwbare inzichten in veranderingen in waterkwaliteit en helpt het systeem lekkages en afwijkingen vroegtijdig te detecteren. Hiermee worden transparantie, duurzamer waterbeheer en naleving van waterrichtlijnen binnen de glastuinbouw en landbouw bevorderd.",
        "Plant-e and partners are working together on maintenance-free, plant-powered sensors for continuous real-time monitoring of surface water quality around greenhouse and agricultural areas. By continuously measuring temperature and electrical conductivity (EC), the SensorStick provides reliable insight into changes in water quality and helps detect leaks and anomalies early. This promotes transparency, more sustainable water management and compliance with water regulations in horticulture and agriculture.",
      ),
      L(
        "Dankzij realtime dataverzameling kunnen terreinbeheerders, waterbeheerders en land- en tuinbouwbedrijven sneller reageren op veranderingen in waterkwaliteit en potentiële vervuilingsbronnen. Continue monitoring maakt het mogelijk trends over langere perioden inzichtelijk te maken, waterbeheer te optimaliseren en de impact op omliggende ecosystemen te verminderen.",
        "Real-time data collection allows land managers, water authorities and growers to respond faster to changes in water quality and potential sources of pollution. Continuous monitoring reveals trends over longer periods, helps optimise water management and reduces the impact on surrounding ecosystems.",
      ),
      L(
        "Met LoRa-connectiviteit worden meetgegevens automatisch verzonden naar een online dashboard, waardoor monitoring op afstand van meerdere locaties mogelijk is zonder frequente bezoeken op locatie. Dit vermindert arbeidskosten, verhoogt de efficiëntie en ondersteunt een datagedreven aanpak van duurzaam waterbeheer.",
        "With LoRa connectivity, measurements are sent automatically to an online dashboard, enabling remote monitoring of multiple locations without frequent site visits. This reduces labour costs, increases efficiency and supports a data-driven approach to sustainable water management.",
      ),
      L(
        "De Waterkwaliteit SensorStick biedt een betrouwbare en kosteneffectieve oplossing voor moderne waterkwaliteitsmonitoring, waarbij duurzaamheid, efficiëntie en continue dataverzameling worden gecombineerd in één geïntegreerd systeem.",
        "The Water Quality SensorStick offers a reliable and cost-effective solution for modern water quality monitoring, combining sustainability, efficiency and continuous data collection in one integrated system.",
      ),
    ],
    applications: [L("Glastuinbouw", "Greenhouse horticulture"), L("Oppervlaktewatermonitoring", "Surface water monitoring"), L("Landbouw en irrigatie", "Agriculture and irrigation")],
    specs: [
      { title: generalTitle, rows: [
        { label: L("Beschikbare data", "Available data"), values: [L("Elektrische geleidbaarheid", "Electrical conductivity"), L("Bodemtemperatuur", "Soil temperature"), L("Status stroombron", "Power source status")] },
        lifetime, power,
        { label: L("Afmetingen (cm)", "Dimensions (cm)"), values: [L("⌀ 8,5 x 100", "⌀ 8.5 x 100")] },
      ] },
      { title: transTitle, rows: [
        { label: L("Protocol", "Protocol"), values: [L("LoRa")] },
        { label: L("Transmissiefrequentie", "Transmission frequency"), values: [L("Per uur", "Hourly")] },
        { label: L("Formaat", "Format"), values: [L("CSV/Excel")] },
      ] },
      { title: L("Waterkwaliteitsmetingen", "Water quality measurements"), rows: [
        { label: L("Meetfrequentie", "Measurement frequency"), values: [L("Per uur", "Hourly")] },
        { label: L("Precisie", "Precision"), values: [L("±5% (0-23 dS/m)")] },
        { label: L("Meettype", "Measurement type"), values: [L("FDR-technologie (Frequency Domain Reflectometry)", "FDR technology (Frequency Domain Reflectometry)")] },
      ] },
    ],
    useCases: [
      { image: "/media/2026/05/cropped-glastuin.jpg", title: L("Glastuinbouw", "Greenhouse horticulture") },
      { image: "/media/2026/05/cropped-oppervlaktewater.jpg", title: L("Oppervlaktewatermonitoring", "Surface water monitoring") },
      { image: "/media/2026/05/cropped-landbouwirrigatie.jpg", title: L("Landbouw en irrigatie", "Agriculture and irrigation") },
      { image: "/media/2026/05/cropped-monitoring.jpg", title: L("Slimme monitoring op afstand", "Smart remote monitoring") },
    ],
    brochure: { pdf: "/media/2026/06/202605-Brochure-WaterQuality-Sensors-Portrait.pdf", label: L("Waterkwaliteit SensorStick", "Water Quality SensorStick") },
  },
};

export const sensorShared = {
  applications: L("Toepassingen", "Applications"),
  specs: L("Specificaties", "Specifications"),
  brochureTitle: L("Meer informatie over de SensorStick", "More information about the SensorStick"),
  brochureText: L("We hebben een brochure beschikbaar waarin de technologie en alle specificaties staan beschreven.", "Our brochure describes the technology and all specifications."),
  projectsTitle: L("Projecten met sensoren", "Projects with sensors"),
  projectsText: L(
    "We bespreken projecten in nauw overleg met de opdrachtgever, waarbij verschillende toepassingen met onze technologie mogelijk zijn. Hieronder vind je enkele voorbeeldprojecten die we hebben gerealiseerd. Neem contact met ons op via sales@plant-e.com voor een eerste informatief gesprek.",
    "We develop projects in close consultation with the client, and our technology supports many different applications. Below are some example projects we have delivered. Contact us at sales@plant-e.com for an initial conversation.",
  ),
  allProjects: L("Overzicht van alle projecten", "Overview of all projects"),
};

export const technology = {
  title: L("Elektriciteit die de natuur ons geeft", "Electricity that nature gives us"),
  metaDescription: L(
    "Plant-e ontwikkelt producten waar levende planten elektriciteit genereren. Deze technologie is oorspronkelijk ontdekt aan Wageningen University.",
    "Plant-e develops products in which living plants generate electricity. The technology was originally discovered at Wageningen University.",
  ),
  intro: L(
    "Plant-e ontwikkelt producten waar levende planten elektriciteit genereren. Deze technologie, oorspronkelijk ontdekt aan Wageningen University, is sindsdien verder ontwikkeld binnen Plant-e. Met onze stroombron kunnen we continu, dag en nacht, gedurende vele tientallen jaren elektriciteit produceren voor toepassingen met een laag vermogen, zoals sensoren en verlichting.",
    "Plant-e develops products in which living plants generate electricity. The technology, originally discovered at Wageningen University, has since been developed further at Plant-e. With our power source we can produce electricity continuously, day and night, for many decades, for low-power applications such as sensors and lighting.",
  ),
  images: ["/media/2023/10/Plant-e-system.png", "/media/2023/10/Plant-e-technology-1.png"],
  explainedTitle: L("De technologie uitgelegd", "The technology explained"),
  explained: [
    L("Via fotosynthese produceert een plant organisch materiaal. Een deel hiervan gebruikt de plant voor haar eigen groei, een ander deel blijft ongebruikt.", "Through photosynthesis, a plant produces organic matter. Part of it is used for the plant's own growth, while another part remains unused."),
    L("Dit resterende deel wordt door de wortels uitgescheiden in de grond. Rondom deze wortels leven bacteriën die dit organische materiaal afbreken. Tijdens dit afbraakproces komen elektronen als bijproduct vrij.", "This remaining part is excreted into the soil by the roots. Bacteria living around the roots break down this organic matter, releasing electrons as a by-product."),
    L("Plant-e heeft een systeem ontwikkeld waarmee we de vrijgekomen elektronen kunnen gebruiken als elektriciteit. Na gebruik worden deze elektronen opnieuw vrijgegeven in de grond, waardoor de cirkel compleet is.", "Plant-e has developed a system that lets us use these released electrons as electricity. After use, the electrons are released back into the soil, completing the circle."),
  ],
  icon: "M241.5 96s61.5 19.88 61.5 71c0 23.55-7.816 41.514-13.5 52 .93 20.555.293 41.76-2.5 63 3.693-12.454 13.096-39.608 31-56 28.384-25.968 80.5-18.5 80.5-18.5s4.992 28.996-26 60.5c-30.186 30.684-83.694 21.03-86.5 20.5-3.964 26.39-11.18 52.395-21.5 76.5 12.91-17.148 40.978-47 78.5-47 39.632 0 65.5 21.5 65.5 21.5s-23.176 58.5-75 58.5c-46.87 0-70.602-16.662-75-20-1.657 3.346-3.202 6.755-5 10-29.338 52.968-78.852 92-150 92v-16c65.412 0 108.683-34.18 136-83.5.54-.974.974-2.015 1.5-3-9.54 4.327-26.05 10-51 10-61.456-.016-80.5-68.5-80.5-68.5s29.704-19.584 61-16c53.34 6.096 71.736 42.33 77.5 60 10.65-23.807 17.995-50.244 22-77-8.692 2.116-25.625 5.055-51 .5-39.632-7.104-63.928-35.912-69-73 0 0 37.756-13.72 67.5-3 30.606 11.027 47.126 42.485 54.5 60.5 1.642-15.68 1.977-31.258 1.5-46.5-14.61-8.438-41.062-28.31-45.5-60-5.84-41.904 13.5-68.5 13.5-68.5z",
  impactTitle: L("Positieve klimaatimpact van de Plant-e technologie", "The positive climate impact of Plant-e technology"),
  impact: [
    { icon: "M736 576q0 13-9.5 22.5T704 608t-22.5-9.5T672 576q0-46-54-71t-106-25q-13 0-22.5-9.5T480 448t9.5-22.5T512 416q50 0 99.5 16t87 54 37.5 90zm160 0q0-72-34.5-134t-90-101.5-123-62T512 256t-136.5 22.5-123 62-90 101.5T128 576q0 101 68 180 10 11 30.5 33t30.5 33q128 153 141 298h228q13-145 141-298 10-11 30.5-33t30.5-33q68-79 68-180zm128 0q0 155-103 268-45 49-74.5 87t-59.5 95.5-34 107.5q47 28 47 82 0 37-25 64 25 27 25 64 0 52-45 81 13 23 13 47 0 46-31.5 71t-77.5 25q-20 44-60 70t-87 26-87-26-60-70q-46 0-77.5-25t-31.5-71q0-24 13-47-45-29-45-81 0-37 25-64-25-27-25-64 0-54 47-82-4-50-34-107.5T177.5 931 103 844Q0 731 0 576q0-99 44.5-184.5t117-142 164-89T512 128t186.5 32.5 164 89 117 142T1024 576z", title: L("CO2-opslag", "CO2 storage"), text: L("Planten gebruiken CO2 om organisch materiaal te produceren. Ze slaan dus CO2 op terwijl wij stroom maken.", "Plants use CO2 to produce organic matter, so they store CO2 while we generate power.") },
    { icon: "M288 384l62-62-94-98-107 107L0 128l149 128 107-112 131 141 61-61v160H288z", title: L("50% methaanreductie", "50% methane reduction"), text: L("Het opwekken van elektriciteit via Plant-e technologie leidt tot een afname van 50% van de methaanvorming in de bodem. Omdat methaan een 25 keer krachtiger broeikasgas is dan CO2, levert dit een substantieel positief effect op het klimaat op.", "Generating electricity with Plant-e technology reduces methane formation in the soil by 50%. Since methane is a 25 times more potent greenhouse gas than CO2, this has a substantial positive effect on the climate.") },
    { icon: "M400 165q27 41 27 91 0 70-50.5 120.5T256 427v64l-85-86 85-85v64q53 0 90.5-37.5T384 256q0-30-15-60l31-31zm-144-37q-53 0-90.5 37.5T128 256q0 33 15 60l-31 31q-27-41-27-91 0-70 50.5-120.5T256 85V21l85 86-85 85v-64z", title: L("Duurzaamheid", "Durability"), text: L("De materialen in het Plant-e systeem zijn volledig inert, waardoor ze niet afbreken of oplossen in de bodem. Dit zorgt voor een levensduur van 50 tot 100 jaar. We streven voortdurend naar de meest duurzame materiaalopties.", "The materials in the Plant-e system are completely inert, so they do not degrade or dissolve in the soil. This ensures a lifetime of 50 to 100 years. We continuously look for the most sustainable material options.") },
    { icon: "M342 149q16 0 29 13.5t13 29.5v117l-75 75v64H203v-64l-75-75V192q0-16 13-29.5t29-13.5h1V64h42v85h86V64h42l1 85z", title: L("Productie 24/7", "24/7 production"), text: L("Met continue energieproductie, dag en nacht, is er nauwelijks energieopslag zoals een batterij nodig, wat zorgt voor efficiënt energieverbruik.", "With continuous energy production, day and night, there is hardly any need for energy storage such as a battery, ensuring efficient energy use.") },
  ],
};

export const about = {
  title: L("Over Plant-e", "About Plant-e"),
  image: "/media/2023/02/Plant-e-nieuws-Koningin-Maxima-bezoekt-Plant-e-600x401-1.jpg",
  missionLabel: L("Onze missie", "Our mission"),
  missionTitle: L("Écht groene elektriciteit", "Truly green electricity"),
  mission: L("Wij maken elektriciteit met levende planten voor verlichting en sensoren, om bij te dragen aan een duurzamere én groenere wereld.", "We make electricity with living plants for lighting and sensors, to contribute to a more sustainable and greener world."),
  visionLabel: L("Onze visie", "Our vision"),
  vision: [
    L("De wereld heeft niet alleen hernieuwbare maar ook écht duurzame energiebronnen nodig om in de toekomst de wereld van stroom te voorzien zonder de planeet te schaden.", "The world needs energy sources that are not only renewable but truly sustainable, to power the world in the future without harming the planet."),
    L("Per locatie zul je moeten onderzoeken welke duurzame bronnen daar het beste passen. Vaak zal dat een mix zijn van verschillende bronnen.", "Each location calls for research into which sustainable sources fit best. Often this will be a mix of different sources."),
    L("Elektriciteit uit planten zoals wij die ontwikkelen is niet alleen een zeer duurzame bron, maar ook een die bijna overal toe te passen is. Overal waar planten kunnen groeien en water beschikbaar (te maken) is, kunnen wij elektriciteit produceren als bijdrage aan de duurzame energiemix die we nodig hebben.", "Electricity from plants, as we develop it, is not only a very sustainable source but also one that can be used almost anywhere. Wherever plants can grow and water is (or can be made) available, we can produce electricity as part of the sustainable energy mix we need."),
  ],
};

export const team = {
  title: L("Ons team", "Our team"),
  intro: L(
    "Wij zijn een dynamisch bedrijf met een passie voor duurzaamheid en innovatie. We hebben ruim 10 jaar ervaring met het ontwikkelen van onze technologie en producten en het tegelijkertijd vermarkten van deze producten. De technologie omvat diverse expertises: van biologie tot elektronica. Daarom hebben we ook al deze expertises in ons team.",
    "We are a dynamic company with a passion for sustainability and innovation. We have more than 10 years of experience developing our technology and products while bringing them to market. The technology spans many disciplines, from biology to electronics, and our team brings all of that expertise together.",
  ),
  image: "/media/2025/07/cropped-cropped-Teamday-June-2025_2-scaled-1.jpg",
  members: [
    ["Marjolein Helder", "CEO", "https://www.linkedin.com/in/marjoleinhelder/"], ["Paulien van Straten", "COO", "https://www.linkedin.com/in/paulienvanstraten/"], ["Daniel Groen", "Head of R&D", "https://www.linkedin.com/in/daniel-groen-8241a574/"], ["Pim de Jager", "R&D"],
    ["Hadi Rajaei", "Field Experimental Engineer", "https://www.linkedin.com/in/hadi-rajaei-7a94765a/"], ["Justin Vievermanns", "Accountmanager", "https://www.linkedin.com/in/justin-vievermanns/"], ["Sharon Polman", "Business Development", "https://www.linkedin.com/in/sharon-polman-57543495/"],
    ["Junya Nakasugi", "Business Development", "https://www.linkedin.com/in/junya-nakasugi/"], ["Annelies Brakshoofden", "Management Assistant", "https://www.linkedin.com/in/anneliesbrakshoofden/"], ["Silvia van Kempen", "Management Assistant", "https://www.linkedin.com/in/silviavankempen/"],
  ] as [string, string, string?][],
};

export const careers = {
  title: L("Vacatures", "Careers"),
  intro: L(
    "Wij zijn op zoek naar ambitieuze mensen die hart hebben voor duurzaamheid en daar pragmatisch iets mee willen doen. Wil je een bijdrage leveren aan het groener maken van deze wereld?",
    "We are looking for ambitious people who care about sustainability and want to do something practical about it. Would you like to help make the world greener?",
  ),
  none: L("We hebben op dit moment geen openstaande vacatures.", "We currently have no open vacancies."),
  open: L(
    "Open sollicitaties zijn ook welkom. Werk je graag in een jong, dynamisch en groeiend team? Neem dan contact op via hr@plant-e.com.",
    "Open applications are welcome too. Enjoy working in a young, dynamic and growing team? Get in touch via hr@plant-e.com.",
  ),
  apply: L("Solliciteren", "Apply"),
};

export const contact = {
  title: L("Contact", "Contact"),
  info: L("Informatie", "Information"),
  email: "office@plant-e.com",
  address: "Beukenlaan 52, 6871 CL Renkum",
  maps: "https://goo.gl/maps/hAqW1XH7PAHsp5s48",
};

export const newsletter = {
  title: L("Meld je aan voor de nieuwsbrief", "Sign up for the newsletter"),
  text: L("En blijf op de hoogte van de nieuwste projecten en producten!", "And stay up to date on our latest projects and products!"),
};

export const newsPage = {
  title: L("Nieuws", "News"),
  intro: L("We houden een uitgebreid overzicht bij van alle nieuwsberichten met en over Plant-e.", "An overview of all news with and about Plant-e."),
};
export const projectsPage = {
  title: L("Projecten", "Projects"),
  intro: home.projectsText,
  filterAll: L("Alle", "All"),
};

export type FaqGroup = { title: T; items: { q: T; a: T }[] };
export const faq: { title: T; groups: FaqGroup[] } = {
  title: L("Veelgestelde vragen", "Frequently asked questions"),
  groups: [
    {
      title: L("Algemeen", "General"),
      items: [
        { q: L("Wat is de doelgroep?", "Who is Plant-e for?"), a: L("Plant-e richt zich op iedereen die geïnteresseerd is in groene energie, innovatie en het leuk vindt om te experimenteren met nieuwe technologie.", "Plant-e is for anyone interested in green energy and innovation who enjoys experimenting with new technology.") },
        { q: L("Wat bieden we op dit moment aan?", "What do we currently offer?"), a: L("Voor alle producten die je kunt aanschaffen, zie de webshop. Voor de producten die we aan het ontwikkelen zijn kun je terecht op de technologiepagina en het nieuwsoverzicht.", "For all products available to buy, see the webshop. For the products we are developing, see the technology page and the news overview.") },
        { q: L("Wat zijn de randvoorwaarden voor de technologie?", "What conditions does the technology need?"), a: L("De belangrijkste randvoorwaarden voor onze technologie zijn dat ze wordt toegepast in een omgeving met voldoende water en voldoende planten. Momenteel creëren wij zelf deze omgeving door de technologie aan te brengen in bakken waar de planten in groeien. Plant-e ontwikkelt momenteel een systeem dat kan worden toegepast in bestaand, nat natuurgebied zoals deltagebieden, uiterwaarden, rijstvelden en mangroven. Dit systeem kan worden toegepast in gebieden met zowel zoet als zout water.", "The main conditions are that the technology is used in an environment with enough water and enough plants. Currently we create this environment ourselves by placing the technology in containers in which the plants grow. Plant-e is developing a system that can be used in existing wet natural areas such as deltas, floodplains, rice fields and mangroves. This system can be used in areas with both fresh and salt water.") },
        { q: L("Wat voor materiaal wordt gebruikt voor de anode en kathode?", "What material is used for the anode and cathode?"), a: L("Voor de anode en kathode gebruiken wij koolstofmateriaal. Om een stroomkring te maken gebruiken wij titaniumdraad als stroomafnemer. Deze materialen dragen niet bij aan het opwekken van stroom en worden alleen gebruikt om de elektronen te geleiden.", "We use carbon material for the anode and cathode, with titanium wire as the current collector. These materials do not contribute to generating power; they only conduct the electrons.") },
        { q: L("Wat voor membraan gebruiken we?", "What membrane do we use?"), a: L("Wij gebruiken als membraan niet-geleidend, synthetisch scheidingsmateriaal.", "We use a non-conductive synthetic separation material as the membrane.") },
        { q: L("Kan het Plant-e systeem gecombineerd worden met een waterzuiveringsinstallatie?", "Can the Plant-e system be combined with a water treatment installation?"), a: L("De Plant-e technologie is in de toekomst te combineren met een waterzuiveringsinstallatie op basis van planten. Door onze technologie bij de wortels van deze planten aan te brengen, kan er elektriciteit geproduceerd worden terwijl het water door de planten wordt gezuiverd.", "In the future, Plant-e technology can be combined with plant-based water treatment. By applying our technology at the roots of these plants, electricity can be produced while the plants purify the water.") },
        { q: L("Ik wil graag een presentatie op locatie of het Plant-e kantoor bezoeken. Kan dat?", "I would like an on-site presentation or to visit the Plant-e office. Is that possible?"), a: L("Het is mogelijk om een presentatie op locatie af te nemen. Voor een presentatie door een C-level medewerker vragen wij € 3.000 per dagdeel, voor de overige teamleden € 500 per dagdeel, exclusief reis- en eventuele verblijfskosten. Een presentatie met rondleiding op het kantoor van Plant-e kan ook, tegen dezelfde tarieven.", "On-site presentations are possible. A presentation by a C-level team member costs € 3,000 per half day, by other team members € 500 per half day, excluding travel and any accommodation costs. A presentation with a tour of the Plant-e office is also possible, at the same rates.") },
        { q: L("Kan het Plant-e systeem gecombineerd worden met aquaponics of hydroponics?", "Can the Plant-e system be combined with aquaponics or hydroponics?"), a: L("Dat is momenteel niet mogelijk. In de toekomst zal onderzoek zich hier mogelijk op richten, maar op dit moment is dit geen onderdeel van onze activiteiten.", "This is not currently possible. Future research may focus on it, but it is not part of our activities at the moment.") },
      ],
    },
    {
      title: L("Modulair systeem", "Modular system"),
      items: [
        { q: L("Hoeveel stroom levert een systeem?", "How much power does a system deliver?"), a: L("De stroomproductie van ons modulaire systeem is voldoende om de toepassing draaiende te houden, zoals kleine knipperende ledlampjes.", "The power output of our modular system is enough to keep its application running, such as small blinking LED lights.") },
        { q: L("Hoe ziet het onderhoud van een systeem eruit?", "What does maintaining a system involve?"), a: L("Een klein systeem is makkelijk zelf te onderhouden door voldoende water te geven en eventueel af en toe bij te snoeien. Voor onze grote systemen bieden wij onderhoudscontracten aan voor zowel groen als technisch onderhoud. Mail voor de mogelijkheden naar office@plant-e.com.", "A small system is easy to maintain yourself by giving it enough water and pruning occasionally if needed. For our large systems we offer maintenance contracts covering both green and technical maintenance. Email office@plant-e.com for the options.") },
        { q: L("Wat is de levensduur van een systeem?", "What is the lifetime of a system?"), a: L("De levensduur hangt af van de materialen. De materialen die wij gebruiken zijn inert en vergaan daardoor niet. Het meest kwetsbaar zijn de elektrische schakelingen, maar die zijn makkelijk te vervangen doordat de elektronica goed bereikbaar is.", "The lifetime depends on the materials. The materials we use are inert and do not decay. The most vulnerable parts are the electrical circuits, but these are easy to replace because the electronics are easily accessible.") },
        { q: L("Welke plantsoorten worden gebruikt voor het systeem?", "Which plant species are used?"), a: L("In principe kunnen alle planten worden gebruikt die tegen natte voeten kunnen, omdat de technologie werkt in een waterverzadigde omgeving. We gebruiken veelal grassen, omdat die goed tegen water kunnen en een uitgebreid wortelstelsel maken. Bekijk ook onze [plantenlijst](/media/2023/03/Plant-e-Plantenlijst.pdf).", "In principle, any plant that tolerates wet feet can be used, since the technology works in a water-saturated environment. We mostly use grasses, as they cope well with water and develop an extensive root system. See also our [plant list](/media/2023/03/Plant-e-Plantenlijst.pdf).") },
        { q: L("Is het mogelijk om de technologie in een ander ontwerp te verwerken?", "Can the technology be integrated into another design?"), a: L("Het systeem bestaat uit modules (bakken) van 100 x 40 cm waarin de planten en de technologie zijn geïntegreerd; de draden zijn niet zichtbaar. In een ontwerp moeten deze modules worden verwerkt. Bij verticale toepassingen betekent dit dat de modules horizontaal geplaatst moeten worden.", "The system consists of 100 x 40 cm modules in which the plants and technology are integrated, with no visible wires. A design needs to incorporate these modules. In vertical applications, the modules must be placed horizontally.") },
      ],
    },
    {
      title: L("Studenten en scholieren", "Students"),
      items: [
        { q: L("Ik wil onderzoek doen naar de Plant-e technologie (P-MFC) voor mijn studie of school. Waar vind ik meer informatie?", "I want to research Plant-e technology (P-MFC) for my studies. Where can I find more information?"), a: L("Voor meer wetenschappelijke informatie over de P-MFC lees je [het proefschrift van Marjolein Helder](https://edepot.wur.nl/239054).", "For more scientific information about the P-MFC, read [Marjolein Helder's PhD thesis](https://edepot.wur.nl/239054).") },
        { q: L("Kan ik stage lopen bij Plant-e?", "Can I do an internship at Plant-e?"), a: L("Plant-e biedt stageplekken aan. Stuur een mail naar office@plant-e.com met je cv en een motivatiebrief waarin je je achtergrond, de duur van je stage en wat je bij Plant-e zou willen doen beschrijft. Houd er rekening mee dat we vragen dat je minimaal 4 maanden beschikbaar bent en dat je zelf woonruimte zoekt als je tijdens je stage in de buurt wilt wonen.", "Plant-e offers internships. Email office@plant-e.com with your CV and a motivation letter describing your background, the length of your internship and what you would like to do at Plant-e. Please note that we ask for a minimum availability of 4 months and that you arrange your own accommodation if you want to live nearby during your internship.") },
      ],
    },
  ],
};

export type Partner = { name: string; logo: string; href?: string };

export const partners: Partner[] = [
  { name: "Natural England", logo: "/media/2025/09/Natural-England.jpg" },
  { name: "North Pennines", logo: "/media/2025/09/North-Pennines.png" },
  { name: "Cairngorms", logo: "/media/2025/09/Cairngorms.png" },
  { name: "National Parks & Wildlife Service", logo: "/media/2025/09/NWPS.jpg" },
  { name: "Belmonte Arboretum", logo: "/media/2025/09/Belmonte-Arboretum.jpg" },
  { name: "Division Q", logo: "/media/2025/09/Division-Q.png" },
  { name: "De Enk groen & golf", logo: "/media/2025/09/De-Enk-groen-golf.png" },
  { name: "Wageningen University & Research", logo: "/media/2023/02/cropped-WUR-300x219-1.png" },
  { name: "Slough Borough Council", logo: "/media/2023/02/Slough-300x150-1.jpg" },
  { name: "IRNAS", logo: "/media/2023/02/IRNAS-300x62-1.png" },
  { name: "Glastuinbouw Nederland", logo: "/media/2025/09/Glastuinbouw-Nederland.png" },
  { name: "Stichting Kennis in je Kas", logo: "/media/2025/09/Stichting-Kennis-in-je-Kas.png" },
  { name: "European Innovation Council", logo: "/media/2023/02/cropped-image001.png" },
  { name: "Forres Golf Course", logo: "/media/2025/09/Forres-Golf-Course.png" },
  { name: "Van den Berk boomkwekerijen", logo: "/media/2025/09/Van-den-Berk-boomkwekerijen.png" },
  { name: "EcoSentinel", logo: "/media/2025/09/EcoSentinel.png" },
  { name: "LTO Noord", logo: "/media/2025/09/LTO-Noord.png" },
  { name: "De Verschilmakerij", logo: "/media/2025/09/De-Verschilmakerij.png" },
  { name: "Gemeente Rotterdam", logo: "/media/2023/02/Gemeente-Rotterdam-247x150-1.png" },
  { name: "RVO", logo: "/media/2023/02/RVO-400x150-1.png" },
  { name: "NXP", logo: "/media/2023/02/NXP-1-300x108-1.png" },
  { name: "Hoogheemraadschap Delfland", logo: "/media/2025/09/Hoogheemraadschap-Delfland.png" },
  { name: "Rijkswaterstaat", logo: "/media/2025/09/Rijkswaterstaat.png" },
  { name: "Veenweiden Innovatiecentrum", logo: "/media/2025/09/Veenweiden-innovatie-centrum.png" },
  { name: "Waterschap De Dommel", logo: "/media/2025/09/Waterschap-de-Dommel.png" },
];

export const productPartners: Partner[] = [
  { name: "IRNAS", logo: "/media/2023/02/IRNAS-300x62-1.png", href: "https://www.irnas.eu/embracing-sustainability-in-product-development/" },
  { name: "NXP", logo: "/media/2023/02/NXP-1-300x108-1.png", href: "https://www.nxp.com/company/blog/building-the-bio-iot:BL-BUILDING-THE-BIO-IOT" },
  { name: "SODAQ", logo: "/media/2023/10/sodaq.png" },
  { name: "Lacuna Space", logo: "/media/2023/10/Lacuna-Space.png" },
  { name: "Wageningen University & Research", logo: "/media/2023/02/WUR-300x219-1.png" },
  { name: "European Innovation Council", logo: "/media/2023/02/cropped-image001.png" },
  { name: "Partner", logo: "/media/2023/02/cropped-image001-1.png" },
  { name: "Microsoft", logo: "/media/2023/02/Microsoft-1.png" },
  { name: "Slough Borough Council", logo: "/media/2023/02/Slough-300x150-1.jpg" },
  { name: "NEMO Science Museum", logo: "/media/2023/02/Nemo-500x150-1.png" },
  { name: "Gemeente Rotterdam", logo: "/media/2023/02/Gemeente-Rotterdam-247x150-1.png" },
  { name: "Radboud Universiteit", logo: "/media/2023/02/Radboud.png" },
  { name: "RVO", logo: "/media/2023/02/RVO-400x150-1.png" },
  { name: "NIOO-KNAW", logo: "/media/2023/02/NIOO-304x150-1.png" },
  { name: "Royal FloraHolland", logo: "/media/2023/06/cropped-Royal-Flora-Holland-Logo.svg.png" },
  { name: "Nykilde", logo: "/media/2023/02/Nykilde-430x150-1.jpg" },
  { name: "AOC Terra", logo: "/media/2023/06/cropped-Logo_AOC_FC.jpg" },
  { name: "Universit\u00e4t Bielefeld", logo: "/media/2023/02/Bielefield-University.png" },
  { name: "Ministerie van Binnenlandse Zaken", logo: "/media/2023/02/Binnenlandse-Zaken-426x155-1.png" },
  { name: "Coneybeare", logo: "/media/2023/02/Coneybeare.png" },
  { name: "Don Bosco College", logo: "/media/2023/02/Don-Bosco-college-408x150-1.png" },
  { name: "Fontys", logo: "/media/2023/02/Fontys-297x150-1.png" },
  { name: "Gemeente Den Haag", logo: "/media/2023/06/cropped-1200px-Compact_Logo_gemeente_Den_Haag.svg.png" },
  { name: "Gemeente Ede", logo: "/media/2023/06/cropped-Gemeente_Ede_Logo.jpg" },
  { name: "Gemeente Venlo", logo: "/media/2023/02/Gemeente-Venlo.png" },
  { name: "Universiteit Gent", logo: "/media/2023/02/Gent-University-187x150-1.png" },
  { name: "Ginkel", logo: "/media/2023/02/Ginkel-245x150-1.png" },
  { name: "Groen Onderwijscentrum", logo: "/media/2023/02/Groen-onderwijscentrum-247x150-1.jpg" },
  { name: "HIG", logo: "/media/2023/02/HIG.png" },
  { name: "Kerckebosch", logo: "/media/2023/02/Kerckebosch-180x150-1.jpg" },
  { name: "MQCD", logo: "/media/2023/02/MQCD.png" },
  { name: "Windpark Nijmegen", logo: "/media/2023/02/Nijmegen-Windpark.png" },
  { name: "Partner", logo: "/media/2023/06/cropped-1584217978.jpg" },
  { name: "Neobuild", logo: "/media/2023/02/Neobuild-332x150-1.png" },
  { name: "Partner", logo: "/media/2023/06/cropped-Screenshot-2023-06-20-114846-2.png" },
  { name: "Randers Kommune", logo: "/media/2023/02/Randers-Kommune-254x150-1.jpg" },
  { name: "Semper Green", logo: "/media/2023/02/Semper-Green-470x150-1.jpg" },
  { name: "University of Oulu", logo: "/media/2023/06/University-of-Oulo.png" },
  { name: "Upright", logo: "/media/2023/02/Upright-200x150-1.jpg" },
  { name: "Vives", logo: "/media/2023/02/Vives-210x150-1.jpg" },
  { name: "VLAG", logo: "/media/2023/02/VLAG-150x150-1.png" },
  { name: "Wetsus", logo: "/media/2023/02/Wetsus-390x150-1.jpg" },
  { name: "WIMEK", logo: "/media/2023/02/Wimek-197x150-1.jpg" },
  { name: "Witteveen+Bos", logo: "/media/2023/02/Witteveen-en-Bos-578x150-1.jpg" },
  { name: "Goeters", logo: "/media/2023/06/cropped-Goeters.jpg" },
  { name: "NL Greenlabel", logo: "/media/2023/06/cropped-Logo-NL-Greenlabel-met-naam-scaled-1.jpg" },
];

export const aboutPartners: Partner[] = [
  { name: "European Innovation Council", logo: "/media/2023/02/cropped-image001.png" },
  { name: "Partner", logo: "/media/2023/02/cropped-image001-1.png" },
  { name: "Wageningen University & Research", logo: "/media/2023/02/WUR-300x219-1.png" },
  { name: "Microsoft", logo: "/media/2023/02/Microsoft-1.png" },
  { name: "Slough Borough Council", logo: "/media/2023/02/Slough-300x150-1.jpg" },
  { name: "NEMO Science Museum", logo: "/media/2023/02/Nemo-500x150-1.png" },
  { name: "Gemeente Rotterdam", logo: "/media/2023/02/Gemeente-Rotterdam-247x150-1.png" },
  { name: "Radboud Universiteit", logo: "/media/2023/02/Radboud.png" },
  { name: "RVO", logo: "/media/2023/02/RVO-400x150-1.png" },
  { name: "NIOO-KNAW", logo: "/media/2023/02/NIOO-304x150-1.png" },
  { name: "Royal FloraHolland", logo: "/media/2023/02/Royal-Flora-Holland-250x150-1.jpg" },
  { name: "Nykilde", logo: "/media/2023/02/Nykilde-430x150-1.jpg" },
  { name: "AOC Terra", logo: "/media/2023/02/AOC.jpg" },
  { name: "Universit\u00e4t Bielefeld", logo: "/media/2023/02/Bielefield-University.png" },
  { name: "Ministerie van Binnenlandse Zaken", logo: "/media/2023/02/Binnenlandse-Zaken-426x155-1.png" },
  { name: "Coneybeare", logo: "/media/2023/02/Coneybeare.png" },
  { name: "Don Bosco College", logo: "/media/2023/02/Don-Bosco-college-408x150-1.png" },
  { name: "Fontys", logo: "/media/2023/02/Fontys-297x150-1.png" },
  { name: "Gemeente Den Haag", logo: "/media/2023/02/Gemeente-Den-Haag-150x144-1.png" },
  { name: "Gemeente Ede", logo: "/media/2023/02/Gemeente-Ede-80x75-1.png" },
  { name: "Gemeente Venlo", logo: "/media/2023/02/Gemeente-Venlo.png" },
  { name: "Universiteit Gent", logo: "/media/2023/02/Gent-University-187x150-1.png" },
  { name: "Ginkel", logo: "/media/2023/02/Ginkel-245x150-1.png" },
  { name: "Groen Onderwijscentrum", logo: "/media/2023/02/Groen-onderwijscentrum-247x150-1.jpg" },
  { name: "HIG", logo: "/media/2023/02/HIG.png" },
  { name: "IRNAS", logo: "/media/2023/02/IRNAS-300x62-1.png" },
  { name: "Kerckebosch", logo: "/media/2023/02/Kerckebosch-180x150-1.jpg" },
  { name: "MQCD", logo: "/media/2023/02/MQCD.png" },
  { name: "Windpark Nijmegen", logo: "/media/2023/02/Nijmegen-Windpark.png" },
  { name: "Nordwin College", logo: "/media/2023/02/Nordwin-150x150-1.jpg" },
  { name: "Neobuild", logo: "/media/2023/02/Neobuild-332x150-1.png" },
  { name: "Nassau College", logo: "/media/2023/02/Nassau-college-245x150-1.png" },
  { name: "NXP", logo: "/media/2023/02/NXP-1-300x108-1.png" },
  { name: "Randers Kommune", logo: "/media/2023/02/Randers-Kommune-254x150-1.jpg" },
  { name: "Semper Green", logo: "/media/2023/02/Semper-Green-470x150-1.jpg" },
  { name: "University of Oulu   1", logo: "/media/2023/02/University-of-Oulu-114x150-1.jpg" },
  { name: "Upright", logo: "/media/2023/02/Upright-200x150-1.jpg" },
  { name: "Vives", logo: "/media/2023/02/Vives-210x150-1.jpg" },
  { name: "VLAG", logo: "/media/2023/02/VLAG-150x150-1.png" },
  { name: "Wetsus", logo: "/media/2023/02/Wetsus-390x150-1.jpg" },
  { name: "WIMEK", logo: "/media/2023/02/Wimek-197x150-1.jpg" },
  { name: "Witteveen+Bos", logo: "/media/2023/02/Witteveen-en-Bos-578x150-1.jpg" },
];


export const brand = {
  logo: "/media/2023/01/plant-e-logo-website.png",
  logoMark: "/media/2023/01/292443468_546496916978011_2879600344467351588_n.png",
  dashboardUrl: "https://dashboard.plant-e.com/",
};

export const newsHighlights: { image: string; title: T; post?: string }[] = [
  { image: "/media/2023/01/cropped-Maxima-1.jpg", title: L("Koningin Máxima op bezoek bij Plant-e", "Queen Máxima visits Plant-e"), post: "koningin-maxima-bezoekt-plant-e" },
  { image: "/media/2023/01/maxresdefault.jpg", title: L("Plant-e ontvangt prestigieuze European Innovation Council (EIC) beurs", "Plant-e receives prestigious European Innovation Council (EIC) grant"), post: "plant-e-receives-prestigious-grant-from-the-european-innovation-council-for-development-of-plant-powered-sensors" },
  { image: "/media/2023/02/Marjolein-Helder_2.jpg", title: L("Plant-e bij het World Economic Forum", "Plant-e at the World Economic Forum") },
  { image: "/media/2023/02/2014-03-31-16.03.39.jpg", title: L("Plant-e presenteert bij TEDx, 2014", "Plant-e presents at TEDx, 2014") },
];

export const inTheNews = {
  title: L("In het nieuws", "In the news"),
  intro: L(
    "Bekijk hier Plant-e in het nieuws! Bijvoorbeeld [het bezoek van Koningin Máxima](/actueel/koningin-maxima-bezoekt-plant-e), de toekenning van de [prestigieuze EIC-beurs](/actueel/plant-e-receives-prestigious-grant-from-the-european-innovation-council-for-development-of-plant-powered-sensors) of onze aanwezigheid bij het World Economic Forum.",
    "See Plant-e in the news! For example [the visit of Queen Máxima](/en/news/koningin-maxima-bezoekt-plant-e), the award of the [prestigious EIC grant](/en/news/plant-e-receives-prestigious-grant-from-the-european-innovation-council-for-development-of-plant-powered-sensors) or our presence at the World Economic Forum.",
  ),
  postsTitle: L("Nieuwsberichten", "News articles"),
  faqText: L(
    "We houden een uitgebreid overzicht bij van alle nieuwsberichten met en over Plant-e. Wil jij weten wat er nu speelt? Bekijk dan onze nieuwspagina!",
    "We keep an extensive overview of all news with and about Plant-e. Want to know what is happening right now? Take a look at our news page!",
  ),
  faqCta: L("Naar het nieuws", "Go to the news"),
};

export const faqImage = "/media/2023/02/Plant_qm.png";

export const shopImages = {
  hero: "/media/shop/2023/04/Hand_plant-e1683143753855.jpeg",
  custom: "/media/shop/2023/04/Lamp_plant.jpeg",
  expo: "/media/shop/2023/04/cropped-13539173043_9d0e677e9a_o-scaled-1-1024x1024-1.jpg",
  productHeader: "/media/shop/2023/04/Verlichting-Vrijstaande-plantenbak-Rotterdam-versie-scaled.jpg",
  thanks: "/media/shop/2023/05/Green-heart-scaled.jpg",
  euLogo: "/media/shop/2023/04/EU_logo.png",
  categories: {
    home: "/media/shop/2023/04/Box@home-plants-scaled.jpg",
    work: "/media/shop/2023/04/Bos-1.jpeg",
    school: "/media/shop/2023/04/Bos1273584292-cbcd5f85f4c646d58f7a7fa158dcaaeb.jpg",
  } as Record<string, string>,
};

export const shopExtra = {
  expoTitle: L("Presentaties & Expo's", "Presentations & Expos"),
  expoText: L("Benieuwd naar onze technologie? We komen er graag over vertellen. Neem contact op voor de mogelijkheden.", "Curious about our technology? We would love to tell you about it. Get in touch to discuss the options."),
  discover: L("Ontdek meer", "Discover more"),
  viewProducts: L("Bekijk producten", "View products"),
};

export const contactMap = "https://www.google.com/maps/d/u/0/embed?mid=1xnoyRVVfAiLA9OqCXgmWfCbemZHaKCA&ehbc=2E312F";

export const notFoundText = {
  title: L("Oh, nee! Deze pagina doet het niet...", "Oh no! This page does not work..."),
  text: L("Ga terug naar de homepagina.", "Go back to the home page."),
  cta: L("Naar Home", "Go to home"),
  image: "/media/2023/01/cropped-Plant-e-logo-600x230-1.png",
};
