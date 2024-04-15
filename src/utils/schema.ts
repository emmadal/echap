import {z} from 'zod';
import {phoneRegex} from './regex';

export const productSchema = z.object({
  title: z
    .string({
      required_error: 'Entrez le titre',
    })
    .min(10, 'Minimum 10 caractères')
    .max(200, 'Maximum 200 caractères')
    .trim(),
  category_id: z
    .number({
      required_error: 'Choisissez la catégorie',
    })
    .min(1, 'Choisissez une catégorie valide'),
  price: z
    .string({
      required_error: 'Entrez le prix',
    })
    .min(4, 'Prix minimum 1000 FCFA'),

  description: z
    .string({
      required_error: 'Entrez la description',
    })
    .min(10, 'Minimum 10 caractères'),
  phone: z
    .string({
      required_error: 'Entrez votre contact',
    })
    .regex(phoneRegex, 'Entrez un contact valide'),
  banner: z
    .string({
      required_error: 'Choisissez votre image principale',
    })
    .url('Télécharger une image valide')
    .trim(),
  photos: z
    .array(z.string().url(), {
      required_error: "Choisissez d'autres images",
    })
    .min(1, "Choisissez d'autres images"),
});

export const userSchema = z.object({
  name: z
    .string({
      required_error: 'Champ obligatoire',
    })
    .min(5, 'Minimum 10 caractères')
    .max(200, 'Maximum 200 caractères')
    .trim(),
  premium: z.boolean(),
  photo: z.string().url(),
  is_active: z.boolean(),
  role: z.boolean(),
  phone: z
    .string({
      required_error: 'Entrez votre contact ',
    })
    .regex(phoneRegex, 'Entrez un contact valide')
    .trim(),
  city_id: z.number({
    required_error: 'Selectionnez votre ville',
  }),
  country_id: z.number({
    required_error: 'Selectionnez votre pays',
  }),
  biography: z
    .string({
      required_error: 'Champ obligatoire',
    })
    .min(10, 'Minimum 10 caractères')
    .max(250, 'Maximum 255 caractères')
    .trim()
    .optional(),
  whatsapp: z
    .string({
      required_error: 'Contact whatsapp',
    })
    .regex(phoneRegex, 'Entrez un contact valide')
    .optional()
    .optional(),

  instagram: z
    .string({
      required_error: 'Lien instagram',
    })
    .url()
    .optional(),
  tiktok: z
    .string({
      required_error: 'Lien Tiktok',
    })
    .url()
    .optional(),
});

export const registerSchema = z.object({
  name: z
    .string({
      required_error: 'Champ obligatoire',
    })
    .min(5, 'Minimum 05 caractères')
    .max(100, 'Maximum 100 caractères')
    .trim(),
  phone: z
    .string({
      required_error: 'Entrez votre contact ',
    })
    .regex(phoneRegex, 'Entrez un contact valide')
    .trim(),
  city_id: z
    .number({
      required_error: 'Selectionnez votre ville',
    })
    .gt(0, 'Veuillez choisir une ville'),
  country_id: z
    .number({
      required_error: 'Selectionnez votre pays',
    })
    .gt(0, 'Veuillez choisir votre pays'),
  agree: z
    .boolean({
      required_error: 'Veuillez cocher la case',
    })
    .default(false),
});
