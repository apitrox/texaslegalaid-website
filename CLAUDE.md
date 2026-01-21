# TexasLegalAid Application Website

This file provides guidance to Claude Code (claude.ai/code) to work with code in this repository. 

---

## Project Overview

This is `texaslegalaid-website`, a mobile-first, AMP-compatible legal aid intake portal that connects individuals seeking legal assistance with appropriate legal aid providers. The platform serves as both a public-facing intake system and a secure provider portal. 

---

## Application Specifications

`../notes/application-specifications.md` - contains specifications that are to be followed whenever making updates to this application website. When prompted, before making any updates read and understand and then when making updates follow the application specifications. All changes must comply with the specifications contained in `../notes/application-specifications`. 

---

## Permissions

`..\.claude\settings.json` - contains Claude Code permissions for file operations, load these permissions at the beginning of each conversation for use throughout the conversation. 

---

## GitHub

- The git repository for this project `texaslegalaid-website` is at `https://github.com/apitrox/texaslegalaid-website`.
- Pull from GitHub before making any code changes. 
- Commit and Push to GitHub after finishing code changes. 
- Work directly on the `main` branch. 

---

## Guidelines

- Ask me any clarifying questions you may have. Give me multiple-choice options for answers whenever possible. If you do not know something that you need, ask me even if during execution of the implementation plan or updates.
- Before making any changes, create an implementation plan and then execute the plan. Do not ask me to review or approve the plan, just proceed with the plan.
- Use multiple agents whenever practical to do so. 


## Wrapup

When complete:
- delete any project files whose name starts with "tmpclaude-"
- promptly display that the process is complete and give me a step-by-step summary of what was done

---

## Instructions for this conversation

Make the following changes to the `texaslegalaid-website` application website project. These changes are for the Family Help Link online intake application. 
- The objective of these changes is to replicate a page flow from `https://texaslawhelp.org/family-help-link` to this `texaslegalaid-website` application website starting at `../family-help-link.html`. We will keep the interface look and feel consistent using our existing UI components, tools and techniques, but replicate the functionality and words.
- The screenshots to replicate are contained in `../screenshots/flow01/` and are in numbered order. This page flow may already exist in this `texaslegalaid-website` application website project, if it does update the existing and don't create a duplicate.
- The content of page 19 is contained in the markdown file `19 Page content.md`. Use this content to recreate this page and links. 
- Any given page may be used in multiple page flows. We want to define a page one time and reuse it as many times as possible. We will be developing more page flows.  
- Each of the 12 different options on page 18 relates to a set of resource links on page 19. Each set of resource links should be saved as a resuable resource/component that can be independently to create a resource page. 
- As part of the changes, update the `../notes/family-help-link-page-flow.md` to accurately and completely document and reflect the page flow of `../family-help-link.html`. 
- As part of the changes, always update sitemap.xml and all other objects related to SEO that may be impacted with the changes. 