export const projectCategories = [
  "Renovations",
  "Decks & fences",
  "Hardscaping",
  "Landscaping & site work",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export type ProjectImage = {
  src: string;
  alt: string;
};

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  summary: string;
  body: string;
  image: ProjectImage;
  featured?: boolean;
  sourceLabel: string;
  before?: ProjectImage;
  after?: ProjectImage;
};

const sample =
  "Sample imagery. This is not a completed Sandhu Construction and Landscaping project.";

export const projects: Project[] = [
  {
    slug: "wood-framing",
    title: "Wood framing",
    category: "Renovations",
    summary: "An open room framed in lumber, before drywall goes on.",
    body: "A framing page can note the rooms, the openings, and what was kept from the existing house. This picture was made to show that stage of construction. It is not a Sandhu frame.",
    image: {
      src: "/images/framing.webp",
      alt: `${sample} Original illustrative image of a residential interior framed in wood studs, with window openings and an OSB subfloor.`,
    },
    featured: true,
    sourceLabel: "Original illustrative image",
  },
  {
    slug: "drywall-mud-and-tape",
    title: "Drywall mud and tape",
    category: "Renovations",
    summary: "Joint tape set into compound along a drywall seam.",
    body: "Taping and mudding notes belong with the coats, the corners, and whether the walls were finished for paint. This is an illustration of that work, not a Sandhu job.",
    image: {
      src: "/images/drywall-mud.webp",
      alt: `${sample} Original illustrative image of hands embedding paper tape in joint compound on a drywall seam.`,
    },
    featured: true,
    sourceLabel: "Original illustrative image",
  },
  {
    slug: "drywall-hanging",
    title: "Drywall hanging",
    category: "Renovations",
    summary: "Sheets hung on studs, with tape and a pan of mud waiting.",
    body: "A drywall page can record the rooms boarded, the thickness of the sheets, and what still needed tape. This illustration is only a stand-in.",
    image: {
      src: "/images/drywall-hang.webp",
      alt: `${sample} Original illustrative image of drywall sheets screwed to wood studs, with a roll of tape and a pan of joint compound.`,
    },
    featured: true,
    sourceLabel: "Original illustrative image",
  },
  {
    slug: "house-frame",
    title: "House frame",
    category: "Renovations",
    summary: "A two-storey wood frame, partly sheathed, still open to the weather.",
    body: "Use a page like this for structural work: which floor, what was framed, and how the shell was closed in. The photograph is a stock sample, not company work.",
    image: {
      src: "/images/house-frame.webp",
      alt: `${sample} Stock photograph of a wood-framed house under construction, with sheathing on part of the walls.`,
    },
    featured: true,
    sourceLabel: "Stock photograph, Pexels",
  },
  {
    slug: "drywall-room",
    title: "Room in drywall",
    category: "Renovations",
    summary: "A renovation room boarded in drywall, with ladders and an open doorway.",
    body: "This is the in-between stage: boards up, finishes not started. Replace it with a photo from a real room when you have one.",
    image: {
      src: "/images/drywall-room.webp",
      alt: `${sample} Stock photograph of a room under renovation with drywall, metal studs, and ladders.`,
    },
    featured: true,
    sourceLabel: "Stock photograph, Pexels",
  },
  {
    slug: "modern-home-and-lawn",
    title: "Modern home and lawn",
    category: "Landscaping & site work",
    summary: "A contemporary house opening onto a lawn and a covered outdoor room.",
    body: "Use this page for a real project record: where the property is, what year the work was done, and what was built or planted. The photograph is a stand-in so the layout can be reviewed before your own pictures are added.",
    image: {
      src: "/images/hero-home.webp",
      alt: `${sample} A modern two-storey home with dark timber cladding, a lawn, and a covered dining room open to the yard.`,
    },
    sourceLabel: "Stock photograph, Unsplash",
  },
  {
    slug: "outdoor-deck",
    title: "Outdoor deck",
    category: "Decks & fences",
    summary: "A deck set against a timber wall, with seating and a pool edge.",
    body: "A deck project page can note the material, the rail, how the deck is tied to the house, and any stairs or landings. Replace this sample with photographs from a job you have permission to show.",
    image: {
      src: "/images/deck.webp",
      alt: `${sample} A pale deck with outdoor seating beside a swimming pool and a vertical timber screen.`,
    },
    sourceLabel: "Stock photograph, Unsplash",
  },
  {
    slug: "timber-screen-and-paving",
    title: "Timber screen and paving",
    category: "Hardscaping",
    summary: "A paved approach, timber cladding, and a dark fence.",
    body: "Hardscape notes that belong here later include the paver or slab, the edge restraint, and how the surface meets the planting. This picture is only a layout sample.",
    image: {
      src: "/images/timber-screen.webp",
      alt: `${sample} A modern entry with timber cladding, a dark metal fence, and a paved drive.`,
    },
    sourceLabel: "Stock photograph, Unsplash",
  },
  {
    slug: "open-living-update",
    title: "Open living update",
    category: "Renovations",
    summary: "An open living and kitchen space with wood, stone, and large glass.",
    body: "Renovation pages should describe the rooms that changed and what was kept. Do not publish client names or addresses unless you have permission. This photograph is not a Sandhu renovation.",
    image: {
      src: "/images/living.webp",
      alt: `${sample} An open living room with a grey sofa, wood wall, and sliding doors to a patio.`,
    },
    sourceLabel: "Stock photograph, Unsplash",
  },
  {
    slug: "kitchen-update",
    title: "Kitchen update",
    category: "Renovations",
    summary: "A white kitchen with a dark tile backsplash and an island.",
    body: "When a real kitchen project is added, note the cabinet run, the surfaces, and whether the layout of the room changed. This image is a placeholder for that kind of record.",
    image: {
      src: "/images/kitchen.webp",
      alt: `${sample} A white kitchen with black pendant lights, a dark backsplash, and wood flooring.`,
    },
    sourceLabel: "Stock photograph, Unsplash",
  },
  {
    slug: "striped-lawn",
    title: "Striped lawn",
    category: "Landscaping & site work",
    summary: "A broad lawn in front of a house, with narrow planting beds.",
    body: "A lawn project can record whether the work was sod, seed, or repair, and how the edges were cut. This is a stock photograph of a finished lawn, not a documented installation.",
    image: {
      src: "/images/lawn.webp",
      alt: `${sample} A wide striped lawn leading to a gabled house with a paved seating area.`,
    },
    sourceLabel: "Stock photograph, Pexels",
  },
  {
    slug: "foundation-plantings",
    title: "Foundation plantings",
    category: "Landscaping & site work",
    summary: "Shrubs and small trees set along the front of a stone house.",
    body: "Planting pages work best with a short list of what went in and a note about the season the photo was taken. Replace this sample before treating it as company work.",
    image: {
      src: "/images/plantings.webp",
      alt: `${sample} A stone house with a curved drive and beds of shrubs and young trees.`,
    },
    sourceLabel: "Stock photograph, Pexels",
  },
  {
    slug: "paved-walk-and-fence",
    title: "Paved walk and fence",
    category: "Hardscaping",
    summary: "A stepping-stone path, lawn, and metal fence at a modern house.",
    body: "Walkway notes can cover the joint pattern, the width, and where the path starts and ends. The photograph shows the type of page, not a finished Sandhu walk.",
    image: {
      src: "/images/walkway.webp",
      alt: `${sample} A modern house with a path of rectangular pavers through a lawn and a metal fence in front.`,
    },
    sourceLabel: "Stock photograph, Unsplash",
  },
  {
    slug: "covered-porch",
    title: "Covered porch",
    category: "Decks & fences",
    summary: "A deep covered porch on a shingled house, with lawn in front.",
    body: "Porch and deck records can mention posts, rails, and how the roof of the porch is carried. This house is a stock photograph.",
    image: {
      src: "/images/porch.webp",
      alt: `${sample} A grey-shingle house with a white covered porch and a green lawn.`,
    },
    sourceLabel: "Stock photograph, Unsplash",
  },
  {
    slug: "courtyard-patio",
    title: "Courtyard patio",
    category: "Hardscaping",
    summary: "A pale courtyard patio wrapped around a modern house.",
    body: "Use patio pages to show the surface, the furniture zone, and the planting at the edges. This courtyard is sample imagery.",
    image: {
      src: "/images/courtyard.webp",
      alt: `${sample} A white modern house with a large stone patio and a narrow pool.`,
    },
    sourceLabel: "Stock photograph, Unsplash",
  },
  {
    slug: "interlocking-patio",
    title: "Interlocking patio",
    category: "Hardscaping",
    summary: "Charcoal pavers in a running bond, with a lawn edge and shrubs.",
    body: "An interlocking page should show the pattern, the border, and the condition of the base at the edges. This picture was generated to demonstrate that layout. It is not a photograph of a Sandhu patio.",
    image: {
      src: "/images/interlocking.webp",
      alt: `${sample} Original illustrative image of charcoal interlocking pavers beside rounded shrubs and a lawn.`,
    },
    sourceLabel: "Original illustrative image",
  },
  {
    slug: "privacy-fence",
    title: "Privacy fence",
    category: "Decks & fences",
    summary: "A tall wood fence along a lawn, with trees behind it.",
    body: "Fence pages can record height, board direction, posts, and gates. This fence was generated as an illustration for the gallery and is not company work.",
    image: {
      src: "/images/cedar-fence.webp",
      alt: `${sample} Original illustrative image of a tall cedar-coloured privacy fence beside a mown lawn.`,
    },
    sourceLabel: "Original illustrative image",
  },
  {
    slug: "stone-retaining-wall",
    title: "Stone retaining wall",
    category: "Hardscaping",
    summary: "A low dry-laid stone wall with planting above and lawn below.",
    body: "Wall pages should note the height, the material, and how water is handled behind the wall. This image is an illustration, not a built Sandhu wall.",
    image: {
      src: "/images/retaining-wall.webp",
      alt: `${sample} Original illustrative image of a stacked stone retaining wall with shrubs above a lawn.`,
    },
    sourceLabel: "Original illustrative image",
  },
  {
    slug: "yard-ready-for-grading",
    title: "Yard ready for grading",
    category: "Landscaping & site work",
    summary: "An open backyard of patchy grass and bare soil behind a house.",
    body: "Grading is easier to explain with a pair of photos from the same place. This single illustration shows the kind of starting condition a grading note might describe. It is not a Sandhu site.",
    image: {
      src: "/images/grading.webp",
      alt: `${sample} Original illustrative image of a beige two-storey house with a bare, patchy backyard.`,
    },
    sourceLabel: "Original illustrative image",
  },
  {
    slug: "planted-yard",
    title: "Planted yard and paver court",
    category: "Landscaping & site work",
    summary: "A lawn, planted beds, and a curved paver court in front of a house.",
    body: "This illustration is a separate sample from the bare-yard picture. They are not a before-and-after of one property. Use a matched pair, taken in the same place, when you want the comparison slider.",
    image: {
      src: "/images/finished-yard.webp",
      alt: `${sample} Original illustrative image of a beige house with a new lawn, shrubs, and a curved paver court.`,
    },
    sourceLabel: "Original illustrative image",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export const featuredProjects = projects.filter((project) => project.featured);
