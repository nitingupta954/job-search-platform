import pandas as pd
from typing import List, Optional
from jobspy import scrape_jobs

def hunt_for_jobs(
    search_terms: List[str], 
    locations: List[str], 
    site_names: Optional[List[str]] = None, 
    results_wanted: int = 15, 
    hours_old: int = 72
) -> List[dict]:
    if not site_names:
        site_names = ["indeed", "linkedin", "google"]
        
    all_jobs = []

    for term in search_terms:
        for location in locations:
            try:
                jobs = scrape_jobs(
                    site_name=site_names,
                    search_term=term,
                    google_search_term=f"{term} jobs near {location} since last week",
                    location=location,
                    results_wanted=results_wanted,
                    hours_old=hours_old,
                    country_indeed="worldwide", # Changed from Nigeria to support global search
                    linkedin_fetch_description=False,
                )
                if not jobs.empty:
                    all_jobs.append(jobs)
            except Exception as e:
                print(f"Error fetching {term} in {location}: {e}")

    if not all_jobs:
        return []

    final_jobs = pd.concat(all_jobs).drop_duplicates(subset=["title", "company", "site"], keep="first")
    final_jobs.sort_values(by="date_posted", ascending=False, inplace=True)

    columns_to_keep = [
        "title", "company", "location", "via", "site", "date_posted",
        "job_url", "is_remote", "salary", "job_type", "description"
    ]

    for col in columns_to_keep:
        if col not in final_jobs.columns:
            final_jobs[col] = ""

    final_jobs = final_jobs[columns_to_keep]

    final_jobs.rename(columns={
        "title": "job_title",
        "company": "company",
        "location": "location",
        "via": "posted_via",
        "site": "source_site",
        "date_posted": "date_posted",
        "job_url": "job_url",
        "is_remote": "remote",
        "salary": "salary",
        "job_type": "job_type",
        "description": "description",
    }, inplace=True)

    final_jobs.fillna("N/A", inplace=True)
    # Just convert to str without appending "..." to keep the description raw
    final_jobs["description"] = final_jobs["description"].astype(str)
    final_jobs.sort_values(by=["location", "job_title"], inplace=True)
    
    # Convert dataframe to list of dictionaries
    return final_jobs.to_dict("records")