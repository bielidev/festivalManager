export enum TEMPLATE_TYPES {
  NEW = "new",
  CORPORATE = "corporate",
  BIRTHDAY = "birthday",
  WEDDING = "wedding",
  CONFERENCE = "conference",
  WORKSHOP = "workshop",
  GRADUATION = "graduation",
}

export type TemplateType = {
  english: {
    header: string;
  };
  spanish: {
    header: string;
  };
  catalan: {
    header: string;
  };
};
