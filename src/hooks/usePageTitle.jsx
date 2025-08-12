// hooks/useDynamicTitle.js
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ROUTES } from '@/routes/router';
import CONST from '@/utils/constant';

function findTitleInRoutes(routes, path) {
  for (const route of routes) {
    if (route.path === path && route.title) {
      return route.title;
    }

    if (route.children) {
      const title = findTitleInRoutes(route.children, path);
      if (title) return title;
    }
  }

  return null;
}

export const useDynamicTitle = () => {
  const location = useLocation();
  const routes = ROUTES;

  useEffect(() => {
    const matchedTitle = findTitleInRoutes(routes, location.pathname);
    document.title = matchedTitle
      ? `${matchedTitle} | ${CONST.APP_META.APP_NAME}`
      : CONST.APP_META.APP_NAME;
  }, [location.pathname, routes]);
};
