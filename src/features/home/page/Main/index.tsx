import React, { FormEvent, useEffect, useState } from 'react';
import { useInput } from '../../../../hooks/useInput';
import URLApi from '../../../../api/URLApi';
import { AxiosError } from 'axios';

interface LinksRes {
  metadata: {
    links: {
      url_shorten_link: string;
      url_full_link: string;
    }[];
  };
}

const Main: React.FC = () => {
  const [fullLink, resetfullLink, fullLinkAttrs] = useInput('fullLink', '');
  const [shortLink, setShortLink] = useState<string | null>();
  const [links, setLinks] = useState<
    | {
        url_shorten_link: string;
        url_full_link: string;
      }[]
    | null
  >([]);
  useEffect(() => {
    async function getAllLinks() {
      try {
        const resp = await URLApi.GetAllShortenLinks();
        const links = resp.data as LinksRes;

        setLinks(links.metadata.links);
      } catch (error) {
        if (error instanceof AxiosError) {
          const errors = JSON.stringify(error.response?.data.errors[0].message);
          alert(errors);
        }
      }
    }

    getAllLinks();
  }, [shortLink]);

  const handleCreateNewLink = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const resp = await URLApi.CreateNewShortenLink({
        fullLink: fullLink,
      });

      const newShortLink = resp.data as {
        metadata: {
          link: {
            url_shorten_link: string;
            url_full_link: string;
          };
        };
      };

      setShortLink(newShortLink.metadata.link.url_shorten_link);
    } catch (error) {
      if (error instanceof AxiosError) {
        const errors = JSON.stringify(error.response?.data.errors[0].message);
        alert(errors);
      }
    }
  };

  return (
    <div className="container">
      <form action="" onSubmit={handleCreateNewLink}>
        <div className="input-field">
          <label htmlFor="link">link</label>
          <input
            type="text"
            id="link"
            {...fullLinkAttrs}
            placeholder="enter the link you want to shorten"
          />
        </div>
        <button type="submit">create new shorten link</button>
      </form>
      <div className="current-short-link">
        <span>your current short link is: </span>
        <a
          href={`${import.meta.env.VITE_URL}/url/${shortLink}`}
          target="_blank"
        >
          {shortLink}
        </a>
      </div>
      <div className="links-list-container">
        <ul>
          {links ? (
            links.map((link, index) => {
              return (
                <li key={link.url_shorten_link}>
                  <a
                    href={`${import.meta.env.VITE_URL}/url/${
                      link.url_shorten_link
                    }`}
                    target="_blank"
                  >
                    {link.url_shorten_link}
                  </a>
                </li>
              );
            })
          ) : (
            <p>don't have link to display</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Main;
