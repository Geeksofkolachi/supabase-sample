export const SearchUserData = (filterData: any[] | null, filterText: string) => {
  const getFilterUser = filterData?.filter(item => {
    return (
      (item?.firstname && item?.firstname.toLowerCase().includes(filterText.toLowerCase())) ||
      (item?.lastname && item?.lastname.toLowerCase().includes(filterText.toLowerCase())) ||
      (item?.emailaddress && item?.emailaddress.toLowerCase().includes(filterText.toLowerCase()))
    );
  });
  return getFilterUser;
};
