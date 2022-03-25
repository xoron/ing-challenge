# Platinum Front-End Engineer Assignment

## Introduction

This document provides a take home assignment for candidates for the front-end
software engineering position within the Platinum squad at ING NL. The goal is
to see how you approach a problem, how you design, structure, implement, test
and deliver a solution, and how you discuss its details in front of the squad.

## Guidelines

- Your code and other deliverables should be provided as a link for download,
  e.g., from a GitHub repository
- The delivery should include instructions on how to use the application

## Description

The assignment consists of the implementation of a Hacker News client using
a Single-Page Application (SPA) built with Web Components.

Hacker News is a social news website focused on computer science and
entrepreneurship. The original website can be found at
https://news.ycombinator.com/.

A public API exists that allows the website's content to be consumed through
different channels. The public API documentation can be found here
https://github.com/HackerNews/API.

## Layout

The SPA should implement the following layout. There are no strict guidelines on
the styling of the layout, you're free to implement it as you see fit.

+------------------------------------------------------------------------------+
|                                   top bar                                    |
+------------------------------------------------------------------------------+
|                   |                                                          |
|                   |                                                          |
|                   |                                                          |
|                   |                                                          |
|    navigation     |                         content                          |
|                   |                                                          |
|                   |                                                          |
|                   |                                                          |
|                   |                                                          |
+------------------------------------------------------------------------------+

Below a description on what should be rendered in each section:

### Navigation

The navigation section should contain a list of links:

+--------------+------------+
| label | url |
+--------------+------------+
| New Stories | `/hn/new` |
| Top Stories | `/hn/top` |
| Best Stories | `/hn/best` |
| Ask HN | `/hn/ask` |
| Show HN | `/hn/show` |
+--------------+------------+

### Content

The content section should display either a list view or an item view,
depending on the URL.

#### List View

The list view should be displayed for any of the URLs provided in the navigation
section.

Taking as an example the New Stories link `/hn/new`, the ids of the new stories
can be obtained by querying the endpoint
https://hacker-news.firebaseio.com/v0/newstories.json. The rest of endpoints for
the other URLs in the navigation section can be found in the API documentation.

Then each item data can be obtained by querying with the appropriate id the
endpoint https://hacker-news.firebaseio.com/v0/item/${id}.json, where `id` is
the item id to use.

Then for each item, display the following information:

- Clickable title that opens the URL in a new tab
- Score
- Username
- Time reported as the time passed since creation date (e.g., 10 minutes ago)
- # comments, clicking on this will go to the item view, e.g., `/hn/item/1234`
  for item id 1234

The list should be paginated, with 30 items per page. Each page should be
deep-linkable, e.g., `/hn/new?page=3` for the third page of the new stories.

See https://news.ycombinator.com/newest for the original implementation.

#### Item View

The item view should be displayed for URLs starting with `/hn/item`.

When clicking on the # comments of an item in the list view, the item view for
that item should be displayed.

The item data can be retrieved using the same endpoint described above,
https://hacker-news.firebaseio.com/v0/item/${id}.json, where `id` is the item id
to use.

Then, the item view consists of the same fields of the list view, with the
addition of the list of comments:

- Clickable title that opens the URL in a new tab
- Score
- Username
- Time reported as the time passed since creation date (e.g., 10 minutes ago)
- Comments, the hierarchy of the comments should be respected, and it should
  be possible to fold a parent component, hiding all its children

See https://news.ycombinator.com/item?id=30779046 for an example on the original
implementation.

### Top Bar

The top bar section should display the Hacker News logo
https://news.ycombinator.com/y18.gif and a `h1` heading depending on the content
section:

- if a list view is displayed on the content section, display "Hacker News - "
  plus the name of the list
- if a item view is displayed on the content section, display "Hacker News - "

## Routing

In summary, the app should use a base path of `/hn` and route the following URLs:

- `/hn/new` -> content list view
- `/hn/top` -> content list view
- `/hn/best` -> content list view
- `/hn/ask` -> content list view
- `/hn/show` -> content list view
- `/hn/item/:itemId` -> content item view

Any other URL should resolve to the default URL `/hn/top`, i.e. navigating to
`/hn/some/other/url` should redirect to `/hn/top`.

- `*` -> `/hn/top`

## Tech Stack

- Use the tooling and libraries used within ING
  - lit: https://lit.dev/
  - open-wc: https://open-wc.org/
  - modern-web: https://modern-web.dev/
- Use rollup to build the application, see Build section below for more
  requirements
- Build and deploy the application using a CI/CD system, e.g. GitHub Actions and
  GitHub Pages
  - Linting and testing should run in the CI/CD system

## Build

The application should be built using rollup, and comply with the following:

- Use ES modules as the module packaging format
- The output JavaScript code should support the latest 3 version of
  - Chrome
  - Edge
  - Safari
  - Firefox
- Use external dependencies from a CDN

### CDN dependencies

Instead of bundling the external dependencies needed for your application with
the output bundle, we want to fetch these dependencies at run-time from a
CDN. We propose to use any of the following CDNs:

- https://www.skypack.dev/
- https://www.unpkg.com/

To accomplish this, create a rollup plugin that rewrites external module ids
to locations on any of these CDNs.