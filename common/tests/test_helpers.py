from django.conf import settings
from django.test import TestCase
from common.helpers.caching import is_sitemap_url
from common.helpers.constants import FrontEndSection
from common.helpers.front_end import section_path, section_url, get_page_section, get_clean_url
from civictechprojects.sitemaps import SitemapPages


class CommonHelperTests(TestCase):
    def test_prerender_urls(self):
        urls = SitemapPages()
        for url in urls:
            self.assertTrue(is_sitemap_url(url), 'Should be able to prerender ' + url)

    def test_do_not_prerender_urls(self):
        urls = [
            '/projects/signup/',
            '/index/?section=FindProjects&sortField=project_name'
        ]
        for url in urls:
            self.assertFalse(is_sitemap_url(url), 'Should not be able to prerender ' + url)


class FrontEndHelperTests(TestCase):
    def test_section_path(self):
        expected = '/index/?section=AboutEvent&id=test-slug'
        self.assertEqual(expected, section_path(FrontEndSection.AboutEvent, {'id': 'test-slug'}))

    def test_section_url(self):
        expected = settings.PROTOCOL_DOMAIN + '/index/?section=AboutEvent&id=test-slug'
        self.assertEqual(expected, section_url(FrontEndSection.AboutEvent, {'id': 'test-slug'}))

    def test_get_clean_url(self):
        expected = '&clean'
        self.assertEqual(expected, get_clean_url('&amp;clean'))

    def test_get_page_section(self):
        expected = 'AboutEvent'
        self.assertEqual(expected, get_page_section('/index/?section=AboutEvent&id=test-slug'))
        