import fetch from 'jest-fetch-mock'
import { Blutui } from '@/blutui'
import { fetchOnce, fetchURL } from '@/utils/testing'

import menuListFixture from './fixtures/menu-list.json'
import menuFixture from './fixtures/menu.json'
import menuWithItemsFixture from './fixtures/menu-with-items.json'

const accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
const blutui = new Blutui(accessToken)

describe('Menu', () => {
  beforeEach(() => fetch.resetMocks())

  describe('list', () => {
    it('can retrieve a list of menus', async () => {
      fetchOnce(menuListFixture)
      const menus = await blutui.project('foo').admin.menus.list()

      expect(fetchURL()).toBe('https://foo.blutui.com/admin/api/menus')
      expect(menus).toMatchObject({
        object: 'list',
      })
    })
  })

  describe('get', () => {
    it('can retrieve a menu information', async () => {
      fetchOnce(menuFixture)
      const menu = await blutui.project('foo').admin.menus.get(menuFixture.id)

      expect(fetchURL()).toBe(
        `https://foo.blutui.com/admin/api/menus/${menuFixture.id}`
      )

      expect(menu).toMatchObject({
        object: 'menu',
      })
      expect(menu.items).toBe(undefined)
    })

    it('can retrieve a menu information with project', async () => {
      fetchOnce(menuWithItemsFixture)
      const menu = await blutui
        .project('foo')
        .admin.menus.get(menuWithItemsFixture.id, {
          expand: ['items'],
        })
      expect(fetchURL()).toBe(
        encodeURI(
          `https://foo.blutui.com/admin/api/menus/${menuWithItemsFixture.id}?expand[]=items`
        )
      )
      expect(menu).toMatchObject({
        object: 'menu',
      })

      expect(menu.items).toMatchObject([
        {
          object: 'menu_item',
          id: '99bc147e-966c-4dd0-8def-de817c63cf41',
          createdAt: 1720758022,
        },
      ])
    })
  })

  describe('create', () => {
    it('can create a new menu', async () => {
      fetchOnce(menuFixture)
      const menu = await blutui.project('foo').admin.menus.create({
        name: 'Primary Menu',
        handle: 'primary-menu',
      })

      expect(fetchURL()).toBe('https://foo.blutui.com/admin/api/menus')
      expect(menu).toMatchObject({
        object: 'menu',
      })
    })

    it('can create a new menu with items', async () => {
      fetchOnce(menuWithItemsFixture)
      const menu = await blutui.project('foo').admin.menus.create({
        name: 'Primary Menu',
        handle: 'primary-menu',
        items: [
          {
            label: 'Contact',
            url: '/contact',
            isNewTab: false,
            active: true,
          },
        ],
      })

      expect(fetchURL()).toBe('https://foo.blutui.com/admin/api/menus')
      expect(menu).toMatchObject({
        object: 'menu',
        items: [
          {
            object: 'menu_item',
            label: 'Contact',
            url: '/contact',
            isNewTab: false,
            active: true,
          },
        ],
      })
    })
  })

  describe('update', () => {
    it('can update a menu', async () => {
      fetchOnce(menuFixture)
      const menu = await blutui
        .project('foo')
        .admin.menus.update(menuFixture.id, {
          name: 'Primary Menu Updated',
          handle: 'primary-menu-updated',
        })

      expect(fetchURL()).toBe(
        `https://foo.blutui.com/admin/api/menus/${menuFixture.id}`
      )
      expect(menu).toMatchObject({
        object: 'menu',
      })
    })

    it('can update a menu with items', async () => {
      fetchOnce(menuFixture)
      const menu = await blutui
        .project('foo')
        .admin.menus.update(menuFixture.id, {
          name: 'Primary Menu Updated',
          handle: 'primary-menu-updated',
          items: [
            {
              label: 'Contact',
              url: '/contact',
              isNewTab: false,
              active: true,
            },
          ],
        })

      expect(fetchURL()).toBe(
        `https://foo.blutui.com/admin/api/menus/${menuFixture.id}`
      )
      expect(menu).toMatchObject({
        object: 'menu',
      })
    })
  })

  describe('remove', () => {
    it('can remove a menu', async () => {
      fetchOnce(menuFixture)
      await blutui.project('foo').admin.menus.remove(menuFixture.id)

      expect(fetchURL()).toBe(
        `https://foo.blutui.com/admin/api/menus/${menuFixture.id}`
      )
    })
  })
})
