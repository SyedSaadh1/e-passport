'use server';

import dbClient from '../../prisma/dbClient';

function parseDateString(inputDate: any) {
  const parsedDate = new Date(inputDate);

  if (!isNaN(parsedDate.getTime())) {
    return parsedDate;
  }
}

export interface SearchQuery {
  firstName: string;
  surname: string;
  nationality: string;
  mobileNumber: string;
  email: string;
  emiratesIdExpiryDate: string;
  dateOfBirth: string;
  [key: string]: string;
};


export const searchUsersByQuery = async (searchQuery: SearchQuery) => {
  const searchConditions: { [x: string]: { gte: any; } | { contains: any; mode: 'insensitive', } | { equals: any; }; }[] = [];

  Object.keys(searchQuery).forEach(key => {
    let value: any = searchQuery[key];
    if (["emiratesIdExpiryDate", "dateOfBirth"].includes(key)) {
      value = parseDateString(searchQuery.emiratesIdExpiryDate);
      if (value) {
        searchConditions.push({ [key]: { gte: value } });
      }
    } else if (key === "status") {
      searchConditions.push({ [key]: { equals: value } });
    } else {
      searchConditions.push({ [key]: { contains: value, mode: 'insensitive' } });
    }

  })

  if (searchConditions.length > 0) {
    return await dbClient.user.findMany({
      where: {
        AND: searchConditions,
      }
    });
  }
  return [];
};
