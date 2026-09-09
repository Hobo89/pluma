/**
 * Hand-traced from the approved Pluma artboard. Geometry and motion are shared
 * by every output.
 *
 * The open endpoints, gaps, positions and proportions are intentional. Do not
 * regenerate, auto-vectorize, add detail or redraw these paths.
 */

export type IllustrationKind =
  | "pregnancy"
  | "relaxing"
  | "deep-tissue"
  | "sports";

export type IllustrationPath = {
  name: string;
  d: string;
  delay: number;
  duration: number;
};

export type Illustration = {
  title: string;
  concept: string;
  /** Total reveal in ms, including the accent fade. */
  total: number;
  accentDelay: number;
  accentDuration: number;
  paths: readonly IllustrationPath[];
  accent: string;
};

export const illustrations: Record<IllustrationKind, Illustration> = {
  pregnancy: {
    title: "Embarazo",
    concept: "01",
    total: 1500,
    accentDelay: 900,
    accentDuration: 600,
    paths: [
      {
        name: "upper torso",
        d: "M 154 17 C 161 38 175 46 194 60 C 210 72 212 84 195 98",
        delay: 0,
        duration: 400,
      },
      {
        name: "belly and lower front",
        d: "M 200 104 C 226 124 249 152 247 185 C 246 206 236 224 217 238",
        delay: 340,
        duration: 810,
      },
      {
        name: "back and lower contour",
        d: "M 159 66 C 149 93 128 117 113 142 C 88 181 98 213 133 237",
        delay: 160,
        duration: 940,
      },
    ],
    accent:
      "M 213 115 C 231 143 241 167 235 188 C 229 213 208 233 182 239 C 206 215 218 193 222 168 C 225 150 221 132 213 115 Z",
  },
  relaxing: {
    title: "Relajante y linfático",
    concept: "02",
    total: 1850,
    accentDelay: 1150,
    accentDuration: 700,
    paths: [
      {
        name: "reclining upper body",
        d: "M 157 106 C 169 125 189 139 204 133 C 218 122 231 111 250 111 C 282 109 313 137 343 184",
        delay: 0,
        duration: 1120,
      },
      {
        name: "shoulder and lower body",
        d: "M 71 191 C 62 174 67 159 83 153 C 112 142 128 177 154 186",
        delay: 170,
        duration: 1050,
      },
      {
        name: "neck to upper shoulder",
        d: "M 116 71 C 139 67 149 88 165 99 C 172 103 179 105 185 103",
        delay: 100,
        duration: 760,
      },
      {
        name: "outer hair contour",
        d: "M 108 70 C 90 61 72 72 64 90 C 56 109 56 122 48 133 C 43 144 48 156 57 162",
        delay: 220,
        duration: 820,
      },
      {
        name: "loose hair contour",
        d: "M 65 90 C 56 110 35 119 30 136 C 24 148 29 159 37 165",
        delay: 320,
        duration: 760,
      },
      {
        name: "inner hair contour",
        d: "M 104 76 C 90 86 96 98 102 111 C 109 125 102 136 93 143",
        delay: 370,
        duration: 740,
      },
      {
        name: "near shoulder contour",
        d: "M 129 169 C 141 158 152 152 164 148",
        delay: 710,
        duration: 480,
      },
    ],
    accent:
      "M 163 181 C 196 166 222 146 251 142 C 282 137 314 161 338 190 C 304 166 280 155 255 156 C 224 156 192 176 163 181 Z",
  },
  "deep-tissue": {
    title: "Tejido profundo",
    concept: "02",
    total: 1600,
    accentDelay: 1000,
    accentDuration: 600,
    paths: [
      {
        name: "neck and outer back",
        d: "M 197 16 C 201 42 213 52 236 62 C 268 74 279 86 273 122",
        delay: 0,
        duration: 560,
      },
      {
        name: "shoulder and outer side",
        d: "M 169 44 C 181 54 188 68 180 72 C 173 75 165 73 155 77 C 131 85 120 109 115 138",
        delay: 40,
        duration: 590,
      },
      {
        name: "deep back contour",
        d: "M 224 71 C 243 104 242 127 230 154 C 216 183 199 208 202 239",
        delay: 830,
        duration: 650,
      },
      {
        name: "lower inner contour",
        d: "M 179 127 C 163 145 143 164 142 183 C 140 203 162 214 164 240",
        delay: 850,
        duration: 590,
      },
    ],
    accent:
      "M 208 70 C 227 95 231 118 222 145 C 210 175 193 193 186 226 C 179 200 186 179 200 153 C 214 124 219 99 208 70 Z",
  },
  sports: {
    title: "Deportivo",
    concept: "03",
    total: 1250,
    accentDelay: 700,
    accentDuration: 550,
    paths: [
      {
        name: "long diagonal limb",
        d: "M 49 239 C 75 196 96 154 120 114 C 142 80 168 58 194 42 C 205 35 213 28 217 20",
        delay: 0,
        duration: 790,
      },
      {
        name: "opposing limb contour",
        d: "M 91 232 C 110 217 124 205 130 191 C 137 176 133 158 146 144 C 161 130 192 119 213 100 C 235 84 259 81 278 42",
        delay: 120,
        duration: 770,
      },
      {
        name: "bent limb outer edge",
        d: "M 213 101 C 213 120 214 139 220 146 C 249 155 274 190 303 232",
        delay: 420,
        duration: 590,
      },
      {
        name: "bent limb inner edge",
        d: "M 168 136 C 178 160 185 167 204 176 C 227 188 249 204 267 220",
        delay: 510,
        duration: 530,
      },
    ],
    accent:
      "M 77 210 C 115 148 149 95 232 55 C 198 79 159 113 130 144 C 108 168 91 193 77 210 Z",
  },
};
