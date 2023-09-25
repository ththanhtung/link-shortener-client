import { axiosClient } from './axios-client';

interface NewShortenLinkReq {
    fullLink: string
}

interface UpdateLinkReq {
  shortenLink: string;
  fullLink: string;
}

class URLApi {
  CreateNewShortenLink(newShortenLink: NewShortenLinkReq) {
    const url = '/url';
    return axiosClient.post(url, newShortenLink);
  }

  UpdateShortenLink(updatedLink: UpdateLinkReq) {
    const url = `/url/${updatedLink.shortenLink}`;
    return axiosClient.patch(url, {
      fullLink: updatedLink.fullLink,
    });
  }
  DeleteShortenLink(shortenLink: string) {
    const url = `/url/${shortenLink}`;
    return axiosClient.delete(url);
  }
  GetAllShortenLinks() {
    const url = '/url/all';
    return axiosClient.get(url);
  }

  RedirectShortenLink(shortenLink: string) {
    const url = `/url/${shortenLink}`;
    return axiosClient.get(url);
  }
}

export default new URLApi();
