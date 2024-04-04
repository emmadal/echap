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
