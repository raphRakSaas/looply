/**
 * Utilitaires pour la validation et l'affichage de la robustesse du mot de passe.
 * Utilisé par le formulaire d'inscription (SignupForm).
 */

export type PasswordStrength = "faible" | "moyen" | "robuste";

export function getPasswordStrength(pwd: string): PasswordStrength {
  if (!pwd.length) return "faible";
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[a-z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (score <= 1) return "faible";
  if (score <= 3) return "moyen";
  return "robuste";
}

export type PasswordCriteria = {
  length: boolean;
  uppercase: boolean;
  lowercase: boolean;
  digit: boolean;
};

export function getPasswordCriteria(pwd: string): PasswordCriteria {
  return {
    length: pwd.length >= 8,
    uppercase: /[A-Z]/.test(pwd),
    lowercase: /[a-z]/.test(pwd),
    digit: /[0-9]/.test(pwd),
  };
}

export function isPasswordValid(criteria: PasswordCriteria): boolean {
  return (
    criteria.length &&
    criteria.uppercase &&
    criteria.lowercase &&
    criteria.digit
  );
}

export const strengthConfig: Record<
  PasswordStrength,
  { label: string; barClass: string; textClass: string }
> = {
  faible: {
    label: "Faible",
    barClass: "bg-red-500",
    textClass: "text-red-500",
  },
  moyen: {
    label: "Moyen",
    barClass: "bg-amber-500",
    textClass: "text-amber-500",
  },
  robuste: {
    label: "Robuste",
    barClass: "bg-emerald-500",
    textClass: "text-emerald-500",
  },
};

/**
 * Valide le mot de passe pour la soumission du formulaire.
 * Retourne un message d'erreur ou null si valide.
 */
export function validatePassword(pwd: string): string | null {
  if (pwd.length < 8) {
    return "Le mot de passe doit contenir au moins 8 caractères.";
  }
  if (!/[A-Z]/.test(pwd)) {
    return "Le mot de passe doit contenir au moins une majuscule.";
  }
  if (!/[a-z]/.test(pwd)) {
    return "Le mot de passe doit contenir au moins une minuscule.";
  }
  if (!/[0-9]/.test(pwd)) {
    return "Le mot de passe doit contenir au moins un chiffre.";
  }
  return null;
}
