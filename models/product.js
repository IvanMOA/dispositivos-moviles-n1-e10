export const productConverter = {
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    return {
      ...data,
      createdAt: data.createdAt.toDate(),
      soldDates: data?.soldDates?.map((soldDate) => soldDate.toDate()) ?? [],
    };
  },
};
