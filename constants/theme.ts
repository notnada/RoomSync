// ─────────────────────────────────────────────────────────────────────────────
// COMPONENTS
// StyleSheet-ready objects — spread directly into RN style props.
// All values reference the tokens above so one edit propagates everywhere.
// ─────────────────────────────────────────────────────────────────────────────
// RoomSync design system — single source of truth for all RN StyleSheet usage.
// NativeWind className tokens (globals.css) mirror these values exactly.
// Update here → update everywhere.

export const colors = {
  background:            "#0d0d18",
  foreground:            "#f0eeff",

  card:                  "#18182a",
  cardForeground:        "#f0eeff",

  popover:               "#1e1e32",
  popoverForeground:     "#f0eeff",

  primary:               "#7c5cfc",
  primaryForeground:     "#ffffff",

  secondary:             "#1e1e32",
  secondaryForeground:   "#c4b8ff",

  muted:                 "#232338",
  mutedForeground:       "#7a7a9d",

  accent:                "#c6f135",
  accentForeground:      "#0d0d18",

  destructive:           "#ff4d6d",
  destructiveForeground: "#ffffff",

  border:                "rgba(124, 92, 252, 0.15)",
  inputBackground:       "#1e1e32",
  ring:                  "#7c5cfc",

  // extended palette
  violetSoft:            "#a78bfa",
  orangeSoft:            "#fb923c",
  sky:                   "#38bdf8",

  // gradients (use as [start, end] with LinearGradient)
  gradientPrimary:       ["#7c5cfc", "#9f7aff"] as const,
  gradientAccent:        ["#c6f135", "#a8d120"] as const,

  // data viz
  chart: ["#7c5cfc", "#c6f135", "#ff4d6d", "#38bdf8", "#fb923c"] as const,

  // overlays
  overlayDark:           "rgba(13, 13, 24, 0.97)",
  primaryGlow:           "rgba(124, 92, 252, 0.20)",
  primaryGlowStrong:     "rgba(124, 92, 252, 0.45)",
} as const;

export const fonts = {
  sans:    "PlusJakartaSans-Regular",
  medium:  "PlusJakartaSans-Medium",
  bold:    "PlusJakartaSans-Bold",
  black:   "PlusJakartaSans-ExtraBold",
} as const;

export const fontSize = {
  xs:   12,
  sm:   14,
  base: 16,
  lg:   18,
  xl:   20,
  "2xl": 24,
  "3xl": 30,
  "4xl": 36,
} as const;

export const fontWeight = {
  normal:   "400",
  medium:   "500",
  semibold: "600",
  bold:     "700",
  black:    "800",
} as const;

export const lineHeight = {
  tight:   1.25,
  snug:    1.375,
  normal:  1.5,
  relaxed: 1.625,
} as const;

export const spacing = {
  px:    1,
  0:     0,
  0.5:   2,
  1:     4,
  1.5:   6,
  2:     8,
  2.5:   10,
  3:     12,
  3.5:   14,
  4:     16,
  5:     20,
  6:     24,
  7:     28,
  8:     32,
  9:     36,
  10:    40,
  12:    48,
  14:    56,
  16:    64,
  20:    80,
  24:    96,
} as const;

export const radius = {
  none:  0,
  sm:    8,
  md:    12,
  lg:    16,
  xl:    20,
  "2xl": 24,
  "3xl": 32,
  full:  9999,
} as const;

export const shadow = {
  primarySm: {
    shadowColor:   "#7c5cfc",
    shadowOffset:  { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius:  16,
    elevation:     6,
  },
  primaryMd: {
    shadowColor:   "#7c5cfc",
    shadowOffset:  { width: 0, height: 8 },
    shadowOpacity: 0.40,
    shadowRadius:  24,
    elevation:     10,
  },
  primaryLg: {
    shadowColor:   "#7c5cfc",
    shadowOffset:  { width: 0, height: 16 },
    shadowOpacity: 0.50,
    shadowRadius:  48,
    elevation:     16,
  },
  card: {
    shadowColor:   "#000000",
    shadowOffset:  { width: 0, height: 2 },
    shadowOpacity: 0.40,
    shadowRadius:  12,
    elevation:     4,
  },
} as const;
export const components = {

  // ══════════════════════════════════════════════════════════════════════════
  // TAB BAR
  // ════════════════════════════════════════════════════════════════════���═════

  tabBar: {
    // Outer container pinned to the bottom
    bar: {
      flexDirection:    "row"          as const,
      alignItems:       "center"       as const,
      justifyContent:   "space-around" as const,
      paddingHorizontal: spacing[6],
      paddingTop:        spacing[3],
      paddingBottom:     spacing[7],   // extra clearance for home indicator
      borderTopWidth:    1,
      borderTopColor:    colors.border,
      backgroundColor:   colors.overlayDark,
    },

    // Individual tab pressable
    item: {
      flex:           1,
      alignItems:     "center" as const,
      justifyContent: "center" as const,
      gap:            spacing[1],
    },

    // Icon wrapper — base (inactive)
    iconBase: {
      width:          spacing[10],
      height:         spacing[10],
      borderRadius:   radius["2xl"],
      alignItems:     "center" as const,
      justifyContent: "center" as const,
    },

    // Icon wrapper — active state (spread after iconBase)
    iconActive: {
      // LinearGradient covers bg; this adds the glow
      ...shadow.primarySm,
    },

    // Active gradient colours (pass to <LinearGradient colors={...}>)
    iconGradient: colors.gradientPrimary,

    // Glyph colour
    glyphInactive: colors.mutedForeground,
    glyphActive:   colors.primaryForeground,

    // Label
    label: {
      fontFamily:  fonts.bold,
      fontSize:    9,
      fontWeight:  fontWeight.bold,
      lineHeight:  9 * lineHeight.normal,
      color:       colors.mutedForeground,
    },

    labelActive: {
      color: colors.primary,
    },

    // Notification badge
    badge: {
      position:        "absolute" as const,
      top:             -2,
      right:           -2,
      width:           16,
      height:          16,
      borderRadius:    radius.full,
      backgroundColor: colors.accent,
      alignItems:      "center" as const,
      justifyContent:  "center" as const,
    },

    badgeText: {
      fontFamily:  fonts.black,
      fontSize:    9,
      fontWeight:  fontWeight.black,
      color:       colors.accentForeground,
      lineHeight:  12,
    },
  },


  // ══════════════════════════════════════════════════════════════════════════
  // LISTING CARD
  // ══════════════════════════════════════════════════════════════════════════

  listingCard: {
    // Outer card shell
    card: {
      backgroundColor: colors.card,
      borderRadius:    radius.xl,
      borderWidth:     1,
      borderColor:     colors.border,
      overflow:        "hidden" as const,
      marginBottom:    spacing[4],
      ...shadow.card,
    },

    // Hero image area
    image: {
      width:  "100%" as const,
      height: 200,
      backgroundColor: colors.muted,  // placeholder bg while loading
    },

    // "Guild-Ready" / "Verified" badge overlaid on image
    imageBadge: {
      position:         "absolute" as const,
      top:              spacing[3],
      left:             spacing[3],
      flexDirection:    "row" as const,
      alignItems:       "center" as const,
      gap:              spacing[1],
      paddingHorizontal: spacing[3],
      paddingVertical:   spacing[1],
      borderRadius:      radius.full,
      backgroundColor:   "rgba(13, 13, 24, 0.82)",
      borderWidth:       1,
      borderColor:       colors.border,
    },

    imageBadgeText: {
      fontFamily:  fonts.bold,
      fontSize:    fontSize.xs,
      fontWeight:  fontWeight.bold,
      color:       colors.accent,
    },

    // Save / heart button on image
    saveButton: {
      position:        "absolute" as const,
      top:             spacing[3],
      right:           spacing[3],
      width:           spacing[9],
      height:          spacing[9],
      borderRadius:    radius.full,
      backgroundColor: "rgba(13, 13, 24, 0.75)",
      alignItems:      "center" as const,
      justifyContent:  "center" as const,
      borderWidth:     1,
      borderColor:     colors.border,
    },

    // Content padding area below image
    body: {
      padding: spacing[4],
      gap:     spacing[3],
    },

    // Row: title + price
    headerRow: {
      flexDirection:  "row" as const,
      alignItems:     "flex-start" as const,
      justifyContent: "space-between" as const,
      gap:            spacing[3],
    },

    title: {
      flex:        1,
      fontFamily:  fonts.black,
      fontSize:    fontSize.base,
      fontWeight:  fontWeight.black,
      lineHeight:  fontSize.base * lineHeight.snug,
      color:       colors.foreground,
    },

    price: {
      fontFamily:  fonts.black,
      fontSize:    fontSize.lg,
      fontWeight:  fontWeight.black,
      lineHeight:  fontSize.lg * lineHeight.tight,
      color:       colors.accent,
    },

    priceUnit: {
      fontFamily:  fonts.sans,
      fontSize:    fontSize.xs,
      fontWeight:  fontWeight.normal,
      color:       colors.mutedForeground,
    },

    // Location row
    locationRow: {
      flexDirection: "row" as const,
      alignItems:    "center" as const,
      gap:           spacing[1],
    },

    locationText: {
      fontFamily:  fonts.sans,
      fontSize:    fontSize.sm,
      fontWeight:  fontWeight.normal,
      color:       colors.mutedForeground,
      flex:        1,
    },

    // Stat chips row (beds / baths / sqft)
    statsRow: {
      flexDirection: "row" as const,
      gap:           spacing[2],
    },

    statChip: {
      flexDirection:    "row" as const,
      alignItems:       "center" as const,
      gap:              spacing[1],
      paddingHorizontal: spacing[3],
      paddingVertical:   spacing[1.5],
      borderRadius:      radius.full,
      backgroundColor:   colors.muted,
      borderWidth:       1,
      borderColor:       colors.border,
    },

    statChipText: {
      fontFamily:  fonts.bold,
      fontSize:    fontSize.xs,
      fontWeight:  fontWeight.bold,
      color:       colors.secondaryForeground,
    },

    // Amenity tag pills
    tagsRow: {
      flexDirection: "row" as const,
      flexWrap:      "wrap" as const,
      gap:           spacing[2],
    },

    tag: {
      paddingHorizontal: spacing[3],
      paddingVertical:   spacing[1],
      borderRadius:      radius.full,
      backgroundColor:   colors.muted,
    },

    tagText: {
      fontFamily:  fonts.sans,
      fontSize:    fontSize.xs,
      fontWeight:  fontWeight.normal,
      color:       colors.mutedForeground,
    },

    // Divider
    divider: {
      height:          1,
      backgroundColor: colors.border,
    },

    // CTA row at the bottom of the card
    ctaRow: {
      flexDirection: "row" as const,
      gap:           spacing[2],
      paddingTop:    spacing[1],
    },

    // Primary CTA button
    ctaPrimary: {
      flex:             1,
      paddingVertical:  spacing[3],
      borderRadius:     radius.lg,
      alignItems:       "center" as const,
      justifyContent:   "center" as const,
      // use LinearGradient with colors.gradientPrimary for the background
      ...shadow.primarySm,
    },

    ctaPrimaryText: {
      fontFamily:  fonts.black,
      fontSize:    fontSize.sm,
      fontWeight:  fontWeight.black,
      color:       colors.primaryForeground,
    },

    // Secondary / ghost CTA button
    ctaSecondary: {
      flex:             1,
      paddingVertical:  spacing[3],
      borderRadius:     radius.lg,
      alignItems:       "center" as const,
      justifyContent:   "center" as const,
      backgroundColor:  colors.muted,
      borderWidth:      1,
      borderColor:      colors.border,
    },

    ctaSecondaryText: {
      fontFamily:  fonts.black,
      fontSize:    fontSize.sm,
      fontWeight:  fontWeight.black,
      color:       colors.foreground,
    },

    // Guild apply variant CTA (lime accent)
    ctaGuild: {
      flex:             1,
      flexDirection:    "row" as const,
      alignItems:       "center" as const,
      justifyContent:   "center" as const,
      gap:              spacing[1.5],
      paddingVertical:  spacing[3],
      borderRadius:     radius.lg,
      backgroundColor:  colors.accent,
    },

    ctaGuildText: {
      fontFamily:  fonts.black,
      fontSize:    fontSize.sm,
      fontWeight:  fontWeight.black,
      color:       colors.accentForeground,
    },

    // Landlord micro-row
    landlordRow: {
      flexDirection: "row" as const,
      alignItems:    "center" as const,
      gap:           spacing[2],
    },

    landlordAvatar: {
      width:           spacing[8],
      height:          spacing[8],
      borderRadius:    radius.full,
      backgroundColor: colors.muted,
      alignItems:      "center" as const,
      justifyContent:  "center" as const,
    },

    landlordName: {
      fontFamily:  fonts.bold,
      fontSize:    fontSize.sm,
      fontWeight:  fontWeight.bold,
      color:       colors.foreground,
    },

    landlordSub: {
      fontFamily:  fonts.sans,
      fontSize:    fontSize.xs,
      fontWeight:  fontWeight.normal,
      color:       colors.mutedForeground,
    },
  },

} as const;

// Re-export everything together for one-liner imports
const theme = {
  colors,
  fonts,
  fontSize,
  fontWeight,
  lineHeight,
  spacing,
  radius,
  shadow,
  components,
};

export default theme;