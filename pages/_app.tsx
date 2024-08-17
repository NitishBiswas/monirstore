import type { AppProps } from 'next/app'
import '../styles/globals.css';
import Layout from '@/layouts/Layout';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function App({ Component, ...rest }: AppProps) {
  const route = useRouter();

  useEffect(() => {
    if (window !== undefined) {
      const storedAuth = localStorage.getItem('monir');
      if (!storedAuth) {
        route.push("/login");
      } else if (storedAuth) {
        // stop going to login page
        const loginRegex = /login/;
        if (loginRegex.test(route.pathname) || route.pathname === "/") {
          route.push("/");
        }
      }
    }
  }, []);

  if (typeof window !== 'undefined') {
    let lastScrollTop =
      window.pageYOffset || document.documentElement.scrollTop;

    window.addEventListener(
      'scroll',
      function handleScroll() {
        const scrollTopPosition =
          window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTopPosition > lastScrollTop) {
          document.body.classList.remove('scroll-bottom');
          document.body.classList.add('scroll-top');
        } else if (scrollTopPosition < lastScrollTop) {
          document.body.classList.remove('scroll-top');
          document.body.classList.add('scroll-bottom');
        }
        lastScrollTop =
          scrollTopPosition <= 0 ? 0 : scrollTopPosition;
      },
      false,
    );
  }

  return (
    <Layout>
      <Component {...rest} />
      <Head>
        <link rel="icon" href="/favicon.svg" />
      </Head>
    </Layout>
  )
}