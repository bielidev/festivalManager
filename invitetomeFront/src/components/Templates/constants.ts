export enum TEMPLATE_TYPES {
  NEW = "new",
  CORPORATE = "corporate",
  BIRTHDAY = "birthday",
  WEDDING = "wedding",
  CONFERENCE = "conference",
  WORKSHOP = "workshop",
  GRADUATION = "graduation",
  TECH = "Tech",
}

export type TemplateType = {
  english: {
    [key: string]: string;
  };
  spanish: {
    [key: string]: string;
  };
  catalan: {
    [key: string]: string;
  };
  custom?: {
    english?: {
      name: string;
      placeholder: string;
      position: string;
    }[];
    spanish?: {
      name: string;
      placeholder: string;
      position: string;
    }[];
    catalan?: {
      name: string;
      placeholder: string;
      position: string;
    }[];
  };
};
