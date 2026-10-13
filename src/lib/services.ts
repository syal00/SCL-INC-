export type ServiceCategory = {
  id: string;
  title: string;
  lede: string;
};

export type Service = {
  slug: string;
  name: string;
  categoryId: ServiceCategory["id"];
  summary: string;
  details: string;
  image: string;
  alt: string;
};

export const serviceCategories: ServiceCategory[] = [
  {
    id: "construction",
    title: "Construction",
    lede: "Work on homes and commercial buildings: renovations, outdoor structures, and the carpentry that ties a building to its site.",
  },
  {
    id: "hardscaping",
    title: "Hardscaping",
    lede: "Paved and stone surfaces that shape how people move through a property and how water leaves it.",
  },
  {
    id: "landscaping",
    title: "Landscaping and site work",
    lede: "Lawn, grade, and planting work that prepares the ground and finishes the outdoor space.",
  },
];

export const services: Service[] = [
  {
    slug: "renovations",
    name: "Renovations",
    categoryId: "construction",
    summary: "Framing, drywall, tape, mud, and the finishes that follow.",
    details:
      "Interior renovations for homes and commercial spaces can include wood framing, hanging drywall, taping and mudding the joints, and the paint or trim after that. Rooms are scoped on site. These steps are proposed until you confirm which ones the company offers.",
    image: "/images/drywall-mud.webp",
    alt: "Illustrative image of joint compound and paper tape being worked into a drywall seam. Not a Sandhu project.",
  },
  {
    slug: "decks",
    name: "Decks",
    categoryId: "construction",
    summary: "Framed outdoor platforms, rails, and stairs.",
    details:
      "Wood or low-maintenance decking, planned around how the yard is used, how the deck meets the house, and how water should drain away from the structure.",
    image: "/images/deck.webp",
    alt: "Sample photograph of a modern deck beside a pool and timber wall. Not a Sandhu project.",
  },
  {
    slug: "fences",
    name: "Fences",
    categoryId: "construction",
    summary: "Privacy, boundary, and garden fences, including gates.",
    details:
      "Board, screen, and garden fences sized for the property. Height, style, and placement should be checked against local rules before building. This site does not state a permit or approval status.",
    image: "/images/cedar-fence.webp",
    alt: "Illustrative image of a tall wood privacy fence beside a lawn. Not a Sandhu project.",
  },
  {
    slug: "interlocking",
    name: "Interlocking",
    categoryId: "hardscaping",
    summary: "Pavers for walkways, patios, and drives.",
    details:
      "Concrete or stone pavers set on a prepared base, in a pattern chosen for the use of the surface. Edges, slope, and the base under the pavers are part of the conversation, not an afterthought.",
    image: "/images/interlocking.webp",
    alt: "Illustrative image of a charcoal interlocking paver patio beside planting beds. Not a Sandhu project.",
  },
  {
    slug: "patios",
    name: "Patios",
    categoryId: "hardscaping",
    summary: "Level outdoor rooms for seating and everyday use.",
    details:
      "Patios in pavers, stone, or concrete, shaped to the house and the way the yard is lived in. Drainage and the transition back to lawn or planting are included in the plan.",
    image: "/images/courtyard.webp",
    alt: "Sample photograph of a modern courtyard patio beside a white house. Not a Sandhu project.",
  },
  {
    slug: "retaining-walls",
    name: "Retaining walls",
    categoryId: "hardscaping",
    summary: "Walls that hold a change in grade.",
    details:
      "Stone or block walls used where a yard steps from one level to another. The height, drainage behind the wall, and what sits above it are reviewed before a design is confirmed.",
    image: "/images/retaining-wall.webp",
    alt: "Illustrative image of a low stone retaining wall with shrubs above a lawn. Not a Sandhu project.",
  },
  {
    slug: "sod-installation",
    name: "Sod installation",
    categoryId: "landscaping",
    summary: "New lawn laid over prepared soil.",
    details:
      "Sod placed after the soil is graded and ready to accept it. The result depends on the base, watering after installation, and how the lawn meets beds, walks, and the house.",
    image: "/images/lawn.webp",
    alt: "Sample photograph of a striped green lawn in front of a house. Not a Sandhu project.",
  },
  {
    slug: "grading",
    name: "Grading",
    categoryId: "landscaping",
    summary: "Shaping the ground so water moves where it should.",
    details:
      "Regrading around a house, yard, or new hardscape so surface water is directed away from the building and toward a sensible outlet. Grading is often the first step under a patio, lawn, or wall.",
    image: "/images/grading.webp",
    alt: "Illustrative image of a bare residential backyard before grading and planting. Not a Sandhu project.",
  },
  {
    slug: "outdoor-improvements",
    name: "Outdoor improvements",
    categoryId: "landscaping",
    summary: "Planting, edges, and smaller upgrades around a finished yard.",
    details:
      "Beds, edges, screens, and other outdoor improvements that complete a project after the main structure or surface is in place. These are scoped with the larger work or as their own visit.",
    image: "/images/hero-home.webp",
    alt: "Sample photograph of a modern home with a lawn and covered outdoor room. Not a Sandhu project.",
  },
];

export const estimateServiceOptions = [
  ...services.map((service) => service.name),
  "Not sure yet",
  "Something else",
];

export function servicesIn(categoryId: string) {
  return services.filter((service) => service.categoryId === categoryId);
}
